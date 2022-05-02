import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryForm!: FormGroup
  categories!: Category[]
  category!: Category
  categoriesSubscription!: Subscription
  categorySubscription!: Subscription
  categoryUpdateSubscription!: Subscription
  categoryDeleteSubscription!: Subscription
  searchSubscription!: Subscription
  searchKeyword = new FormControl('')
  modalMode = ''
  deletedCategory!: number

  currentPage = 1
  itemsPerPage = 5


  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

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
      next: data => this.categories = data
    })
  }

  getAllCategories() {
    this.categoriesSubscription = this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log('Errors occured: ' + err.message),
      complete: () => console.log('fetch successfully')
    })
  }


  onUpdateButtonClicked(categoryId: number | undefined) {
    this.modalMode = 'update'
    if (categoryId) {
      this.categorySubscription = this.categoryService.getCategoryById(categoryId)
        .subscribe({
          next: (data) => {
            this.category = data
            this.categoryForm.patchValue({ name: this.category.name })
          },
          error: (err) => console.log('Errors occured: ' + err.message),
          complete: () => console.log('fetch successfully')
        })
    }

  }

  onCancelModal() {
    this.categoryForm.patchValue({ name: '' })
  }

  onSaveCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: () => this.getAllCategories(),
      error: (err) => console.log('Errors occured: ' + err.message),
      complete: () => console.log('add category successfully')
    })
  }

  onDeleteButtonClicked(categoryId: number | undefined) {
    if (categoryId) {
      this.deletedCategory = categoryId
    }
  }

  onAddButtonClicked() {
    this.modalMode = 'add'
    this.categoryForm.reset()
  }

  onDeleteCategory() {
    this.categoryDeleteSubscription = this.categoryService.deleteCategory(this.deletedCategory)
      .subscribe({
        next: () => this.getAllCategories(),
        error: (err) => console.log('Errors occured: ' + err.message)
      })
  }

  onUpdateCategory() {
    if (this.category.id) {
      this.categoryUpdateSubscription = this.categoryService.updateCategory(this.category.id, this.categoryForm.value)
        .subscribe({
          next: () => {
            this.getAllCategories()
            this.categoryForm.reset()
          },
          error: (err) => console.log('Errors occured: ' + err.message),
          complete: () => console.log('update category successfully')
        })
    }
  }
  get name() {
    return this.categoryForm.get('name')
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe()
    if(this.categorySubscription) {
      this.categorySubscription.unsubscribe()
    }
    if(this.categoryUpdateSubscription) {
      this.categoryUpdateSubscription.unsubscribe()
    }
    if(this.categoryDeleteSubscription) {
      this.categoryDeleteSubscription.unsubscribe()
    }
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}
