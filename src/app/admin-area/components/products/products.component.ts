import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file-upload.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  currentTime: any = new Date()

  categories!: Category[]
  categoriesSubscription!: Subscription

  products!: Product[]
  productsSubscription!: Subscription
  productForm!: FormGroup
  productAddSubscription!: Subscription

  uploadedFile!: File
  fileSubscription!: Subscription
  imageSrc = 'https://bitsofco.de/content/images/2018/12/broken-1.png'

  constructor(private fileService: FileUploadService, private categoryService:
    CategoryService, private formBuilder: FormBuilder,
    private productService: ProductService) {
  }

  ngOnInit(): void {

    this.getAllProducts()
    this.productForm = this.formBuilder.group({
      categoryId: [],
      name: [''],
      producer: [''],
      weight: [],
      fragrant: [''],
      price: [],
      quantity: [],
      quality: [''],
      description: [''],
      imgUrl: ['']
    })
  }

  onAddButtonClicked() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoriesSubscription = this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log('Errors occured: ' + err.message),
      complete: () => console.log('fetch successfully')
    })
  }

  onChooseFile(event: any) {
    this.uploadedFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  getAllProducts() {
    this.productsSubscription = this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.log('Errors occured: ' + err.message),
      complete: () => console.log('products fetched successfully')
    })
  }

  onUploadFile() {
    this.fileService.uploadFile(this.uploadedFile).subscribe(
      {
        next: (data) => this.productForm.patchValue({ imgUrl: data.filename }),
        error: (err) => console.log('Upload file failed!'),
        complete: () => console.log('Upload successfully')
      }
    )
  }
  onAddProduct() {


    this.fileService.uploadFile(this.uploadedFile).subscribe(
      {
        next: (data) => {
          this.productForm.patchValue({ imgUrl: data.filename })
          console.log(this.productForm.value)
          this.productService.addProduct(this.productForm.value).subscribe({
            next: () => this.getAllProducts(),
            error: (err) => console.log('Errors occured: ' + err.message),
            complete: () => console.log('add successfully')
          })
        },
        error: (err) => console.log('Upload file failed!'),
        complete: () => console.log('Upload successfully')
      }
    )
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe()
    }
  }
}
