import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file-storage.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  modalMode = 'add'

  categories!: Category[]
  categoriesSubscription!: Subscription

  products!: Product[]
  product!: Product
  choseFile!: string
  productsSubscription!: Subscription
  productUpdateSubscription!: Subscription
  productForm!: FormGroup
  productAddSubscription!: Subscription
  productDeleteSubscription!: Subscription

  uploadedFile!: File
  fileSubscription!: Subscription
  imageSrc = 'http://localhost:8080/api/files/notfound.png'

  currentPage = 1
  itemsPerPage = 5

  deletedProductId!: number

  constructor(private fileService: FileUploadService, private categoryService:
    CategoryService, private formBuilder: FormBuilder,
    private productService: ProductService) {
  }

  ngOnInit(): void {

    this.getAllProducts()
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      producer: ['', Validators.required],
      weight: ['', Validators.required],
      fragrant: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      quality: ['', Validators.required],
      description: ['', Validators.required],
      sold: [0],
      imgUrl: [''],
      category: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['']
      })
    })
  }


  onAddButtonClicked() {
    this.productForm.reset()
    this.productForm.get('category')?.reset()
    this.imageSrc = 'http://localhost:8080/api/files/notfound.png'
    this.getAllCategories()
    this.modalMode = 'add'
  }

  onUpdateBtnClicked(product: Product) {
    this.getAllCategories()
    this.product = product
    this.choseFile = this.product.imgUrl
    this.productForm.patchValue(product)
    this.imageSrc = 'http://localhost:8080/api/files/' + product.imgUrl
    this.modalMode = 'update'
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
      this.choseFile = file.name
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

  onAddProduct() {
    this.fileSubscription = this.fileService.uploadFile(this.uploadedFile).subscribe(
      {
        next: (data) => {
          this.productForm.patchValue({ imgUrl: data.filename })
          console.log(this.productForm.value)
          this.productAddSubscription = this.productService.addProduct(this.productForm.value).subscribe({
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
  onUpdateProduct() {
    console.log(this.imageSrc);
    if (this.choseFile !== this.product.imgUrl) {
      this.fileSubscription = this.fileService.uploadFile(this.uploadedFile).subscribe(
        {
          next: (data) => {
            if (this.product.id) {
              this.productForm.patchValue({ imgUrl: data.filename })
              this.productUpdateSubscription = this.productService.updateProduct(this.product.id, this.productForm.value).subscribe({
                next: () => this.getAllProducts(),
                error: (err) => console.log('Errors occured: ' + err.message),
                complete: () => console.log('add successfully')
              })
            }
          },
          error: (err) => console.log('Upload file failed!'),
          complete: () => console.log('Upload successfully')
        }
      )
    } else {
      if (this.product.id) {
        this.productUpdateSubscription = this.productService.updateProduct(this.product.id, this.productForm.value).subscribe({
          next: () => this.getAllProducts(),
          error: (err) => console.log('Errors occured: ' + err.message),
          complete: () => console.log('add successfully')
        })
      }
    }
  }

  onDeleteBtnClicked(productId: number | undefined) {
    if (productId) {
      this.deletedProductId = productId
    }
  }
  onDeleteProduct() {
    this.productDeleteSubscription = this.productService.deleteProduct(this.deletedProductId)
      .subscribe({
        next: () => this.getAllProducts(),
        error: (err) => console.log('Errors occured: ' + err.message)
      })
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe()
    }
    if (this.productAddSubscription) {
      this.fileSubscription.unsubscribe()
    }
    if (this.productUpdateSubscription) {
      this.fileSubscription.unsubscribe()
    }
  }


  get categoryId() {
    return this.productForm.get('category')?.get('id')
  }
  get name() {
    return this.productForm.get('name')
  }
  get producer() {
    return this.productForm.get('producer')
  }
  get weight() {
    return this.productForm.get('weight')
  }
  get fragrant() {
    return this.productForm.get('fragrant')
  }
  get price() {
    return this.productForm.get('price')
  }
  get quantity() {
    return this.productForm.get('quantity')
  }
  get quality() {
    return this.productForm.get('quality')
  }
  get description() {
    return this.productForm.get('description')
  }
  get imgUrl() {
    return this.productForm.get('imgUrl')
  }
}
