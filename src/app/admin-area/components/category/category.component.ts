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
  // list of all categories
  categories: Category[]
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
    private categoryService: CategoryService, private toast: NgToastService) { }

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
      next: data => this.categories = data,
      error: err => console.log(`Errors occurred when searching category: ${err.message}`)

    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().then(
      res => {
        this.categories = res
        console.log('All categories are fetched')
      }
    ).catch(err => {
      console.log(`Can not get list of categories: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi không thể lấy danh sách danh mục',
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
          detail: "Thông báo", summary: 'Thêm thành công',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log('New category has added')
      }
    ).catch(err => {
      console.log(`Errors occurred when adding new category: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi thêm mới danh mục',
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
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi lấy danh mục bởi id',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }

  onUpdateCategory() {

    this.categoryService.updateCategory(this.category.id, this.categoryForm.value)
      .then(res => {
        this.getAllCategories()
        this.toast.success({
          detail: "Thông báo", summary: 'Cập nhật thành công',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log(`Category with id = ${this.category.id} has updated`)
      }).catch(err => {
        console.log(`Errors occurred when updating category has id = ${this.category.id}: ${err.message}`)
        this.toast.error({
          detail: "Cảnh báo", summary: 'Lỗi xảy ra khi cập nhật danh mục',
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
          detail: "Thông báo", summary: 'Xóa thành công',
          sticky: false, duration: 3000, position: 'br'
        })
        console.log(`Category with id = ${this.deletedCategoryId} has deleted`)
      }).catch(err => {
        console.log(`Errors occurred when deleting category has id = ${this.deletedCategoryId}: ${err.message}`)
        this.toast.error({
          detail: "Cảnh báo", summary: 'Lỗi xảy ra khi xóa danh mục',
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
