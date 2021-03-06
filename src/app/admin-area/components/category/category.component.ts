import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { debounceTime, distinctUntilChanged, map, Subscription, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  // category form
  categoryForm: FormGroup
  // this variable is used to stored category will be updated 
  category: Category
  searchSubscription: Subscription
  // search form control
  searchKeyword = new FormControl('')
  // decide what modal will be display
  modalMode = 'add'
  // id of category will be deleted.
  deletedCategoryId: number

  currentPage = 1
  itemsPerPage = 5


  constructor(private formBuilder: FormBuilder,
    public categoryService: CategoryService, private toast: NgToastService) { }

  ngOnInit(): void {

    this.getAllCategories()

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })

    this.searchSubscription = this.searchKeyword.valueChanges.pipe(
      tap(() => this.currentPage = 1),
      map(key => key.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(key => {
        if (key == '') {
          return this.categoryService.getAllCategories()
        } else {
          return this.categoryService.findCategoryByName(key)
        }
      })
    ).subscribe({
      next: data => this.categoryService.categories = data,
      error: err => console.log(`Errors occurred when searching category: ${err.message}`)
    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().then(
      res => {
        this.categoryService.categories = res
        console.log('All categories are fetched')
      }
    ).catch(err => {
      console.log(`Can not get list of categories: ${err.message}`)
      this.toast.error({
        detail: "C???nh b??o", summary: 'L???i kh??ng th??? l???y danh s??ch danh m???c',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }

  // start add feature
  onAddButtonClicked() {
    this.modalMode = 'add'
    this.categoryForm.reset()
  }
  onSaveCategory() {

    this.categoryService.addCategory(this.categoryForm.value).then(
      res => {
        this.getAllCategories()
        this.toast.success({
          detail: "Th??ng b??o", summary: 'Th??m th??nh c??ng',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log('New category has added')
      }
    ).catch(err => {
      console.log(`Errors occurred when adding new category: ${err.message}`)
      this.toast.error({
        detail: "C???nh b??o", summary: 'L???i x???y ra khi th??m m???i danh m???c',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
  // end add feature


  //start update feature
  onUpdateButtonClicked(categoryId: number) {
    this.modalMode = 'update'

    this.categoryService.getCategoryById(categoryId).then(
      res => {
        this.category = res
        console.log(`Category with id = ${categoryId} has fetched`)
        this.categoryForm.patchValue({ name: this.category.name })
      }
    ).catch(err => {
      console.log(`Errors occurred when fetching category has id = ${categoryId}: ${err.message}`)
      this.toast.error({
        detail: "C???nh b??o", summary: 'L???i x???y ra khi l???y danh m???c b???i id',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }

  onUpdateCategory() {

    this.categoryService.updateCategory(this.category.id, this.categoryForm.value)
      .then(res => {
        this.getAllCategories()
        this.toast.success({
          detail: "Th??ng b??o", summary: 'C???p nh???t th??nh c??ng',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log(`Category with id = ${this.category.id} has updated`)
      }).catch(err => {
        console.log(`Errors occurred when updating category has id = ${this.category.id}: ${err.message}`)
        this.toast.error({
          detail: "C???nh b??o", summary: 'L???i x???y ra khi c???p nh???t danh m???c',
          sticky: false, duration: 3000, position: 'br'
        })
      })
  }
  // end update feature


  // start delete feature

  onDeleteButtonClicked(categoryId: number) {
    this.deletedCategoryId = categoryId
  }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.deletedCategoryId)
      .then(res => {
        this.getAllCategories()
        this.toast.success({
          detail: "Th??ng b??o", summary: 'X??a th??nh c??ng',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log(`Category with id = ${this.deletedCategoryId} has deleted`)
      }).catch(err => {
        console.log(`Errors occurred when deleting category has id = ${this.deletedCategoryId}: ${err.message}`)
        this.toast.error({
          detail: "C???nh b??o", summary: 'L???i x???y ra khi x??a danh m???c',
          sticky: false, duration: 3000, position: 'br'
        })
      })
  }

  // start delete feature


  get name() {
    return this.categoryForm.get('name')
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}
