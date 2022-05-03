import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
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
export class ProductsComponent implements OnInit {
  // decide what modal will be display
  modalMode = 'add'

  // list of categories
  categories: Category[]

  // list of products
  products: Product[]
  // this variable is used to stored product will be updated 
  product: Product
  // this variable is used to stored name of chosen file
  chosenFile: string

  // form group for product
  productForm: FormGroup
  // file will be uploaded
  uploadedFile: File

  imageSrc = 'http://localhost:8080/api/files/notfound.png'

  currentPage = 1
  itemsPerPage = 5

  // id of product will be deleted.
  deletedProductId: number

  constructor(private fileService: FileUploadService, private categoryService:
    CategoryService, private formBuilder: FormBuilder,
    private productService: ProductService, private toast: NgToastService) {
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

  // start fetch all items
  getAllCategories() {
    this.categoryService.getAllCategories().then(res => {
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

  getAllProducts() {
    this.productService.getAllProducts().then(res => {
      this.products = res
      console.log('All products are fetched')
    }).catch(err => {
      console.log(`Can not get list of products: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi không thể lấy danh sách sản phẩm',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
  // end fetch all items


  // start add feature
  onAddButtonClicked() {
    this.modalMode = 'add'
    this.productForm.reset()
    this.productForm.get('category')?.reset()
    this.imageSrc = 'http://localhost:8080/api/files/notfound.png'
    this.getAllCategories()

  }

  async onAddProduct() {
    await this.fileService.uploadFile(this.uploadedFile).then(
      res => this.productForm.patchValue({ imgUrl: res.filename })
    ).catch(err => {
      console.log('Upload file failed!')
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi tải lên file',
        sticky: false, duration: 3000, position: 'br'
      })
      return
    })
    this.productService.addProduct(this.productForm.value).then(res => {
      this.getAllProducts()
      this.toast.success({
        detail: "Thông báo", summary: 'Thêm thành công',
        sticky: false, duration: 3000, position: 'br'
      })
      console.log('New product has added')
    }).catch(err => {
      console.log(`Errors occurred when adding new product: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi thêm mới sản phẩm',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
  // end add feature


  // start update feature
  onUpdateBtnClicked(product: Product) {
    this.getAllCategories()
    this.product = product
    this.chosenFile = this.product.imgUrl
    this.productForm.patchValue(product)
    this.imageSrc = 'http://localhost:8080/api/files/' + product.imgUrl
    this.modalMode = 'update'
  }

  async onUpdateProduct() {
    if (this.chosenFile !== this.product.imgUrl) {
      await this.fileService.uploadFile(this.uploadedFile).then(res => {
        this.productForm.patchValue({ imgUrl: res.filename })
      }).catch(err => {
        console.log('Upload file failed!')
        this.toast.error({
          detail: "Cảnh báo", summary: 'Lỗi tải lên file',
          sticky: false, duration: 3000, position: 'br'
        })
        return
      })
    }
    this.productService.updateProduct(this.product.id, this.productForm.value).then(res => {
      this.getAllProducts()
      this.toast.success({
        detail: "Thông báo", summary: 'Cập nhật thành công',
        sticky: false, duration: 3000, position: 'br'
      })
    }).catch(err => {
      console.log(`Errors occurred when updating product has id = ${this.product.id}: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi cập nhật sản phẩm',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
  // end update feature


  // start choose file feature
  onChooseFile(event: any) {
    this.uploadedFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.chosenFile = file.name
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  // end choose file feature



  onDetailsBtnClicked(productId: number) {

  }

  // start delete feature
  onDeleteBtnClicked(productId: number) {
    this.deletedProductId = productId
  }
  onDeleteProduct() {
    this.productService.deleteProduct(this.deletedProductId).then(res => {
      this.getAllProducts()
      this.toast.success({
        detail: "Thông báo", summary: 'Xóa thành công',
        sticky: false, duration: 3000, position: 'br'
      })
      console.log(`Product with id = ${this.deletedProductId} has deleted`)
    }).catch(() => {
      console.log(`Errors occurred when deleting category has id = ${this.deletedProductId}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi xóa sản phẩm',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
  // end delete feature

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
