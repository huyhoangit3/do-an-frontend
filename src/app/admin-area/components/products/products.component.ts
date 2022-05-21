import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { OrderPipe } from 'ngx-order-pipe';
import { debounceTime, distinctUntilChanged, map, Subscription, switchMap, tap } from 'rxjs';
import { API } from 'src/app/apiURL';
import { CategoryService } from 'src/app/core/services/category.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // decide what modal will be display
  modalMode = 'add'

  // list of categories
  categories: Category[] = []

  // data export
  dataExport = []
  dataLabel = ['Mã sản phẩm', 'Tên sản phẩm', 'Tên danh mục',
    'Nhà sản xuất', 'Giá bán', 'Chất lượng', 'Số lượng', 'Đã bán', 'Trọng lượng', 'Mùi hương']

  // list of products
  products: Product[] = []
  // this variable is used to stored product will be updated 
  product: Product
  // this variable is used to stored name of chosen file
  chosenFile: string
  // search form control
  searchKeyword = new FormControl('')
  searchSubscription: Subscription

  // form group for product
  productForm: FormGroup
  // file will be uploaded
  uploadedFile: File

  imageSrc = `${environment.baseApiUrl}/images/notfound.png`

  currentPage = 1
  itemsPerPage = 5

  sortKey: string
  reverse: boolean

  // id of product will be deleted.
  deletedProductId: number

  constructor(public fileService: FileUploadService, public categoryService:
    CategoryService, private formBuilder: FormBuilder,
    private orderPipe: OrderPipe,
    public productService: ProductService, private toast: NgToastService) {
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

    this.searchSubscription = this.searchKeyword.valueChanges.pipe(
      tap(() => this.currentPage = 1),
      map(key => key.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(key => {
        if (key == '') {
          return this.productService.getAllProducts()
        } else {
          return this.productService.findProductsByName(key)
        }
      })
    ).subscribe({
      next: res => {
        this.productService.products = res
        if (res.length === 0) {
          setTimeout(() => {
            this.toast.error({
              detail: "Thông báo", summary: 'Không tìm thấy sản phẩm nào',
              sticky: false, duration: 2000, position: 'br'
            })
          }, 500)
        }
      },
      error: err => console.log(`Errors occurred when searching products: ${err.message}`)
    })
  }

  // start fetch all items
  getAllCategories() {
    this.categoryService.getAllCategories().then(res => {
      this.categoryService.categories = res
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
      this.productService.products = res
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
    this.imageSrc = `${environment.baseApiUrl}/images/notfound.png`
    this.getAllCategories()
  }

  sort(key: string) {
    this.sortKey = key
    this.reverse = !this.reverse
    this.productService.products = this.orderPipe.transform(this.productService.products, this.sortKey, this.reverse)
  }

  async onAddProduct() {
    await this.fileService.uploadFile(this.uploadedFile).then(
      res => this.productForm.patchValue({ imgUrl: res.filename })
    ).catch(err => {
      console.log('Upload file failed!', err.message)
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
  async onUpdateBtnClicked(productId: number) {
    this.getAllCategories()
    this.product = await this.productService.getProductById(productId)
    this.chosenFile = this.product.imgUrl
    this.productForm.patchValue(this.product)
    this.imageSrc = `${API.FILE}/${this.product.imgUrl}`
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

  onExportExcel() {
    this.productService.products.forEach(p => {
      this.dataExport.push({
        'Mã sản phẩm': p.id,
        'Tên sản phẩm': p.name,
        'Tên danh mục': p.category.name,
        'Nhà sản xuất': p.producer,
        'Giá bán': p.price,
        'Chất lượng': p.quality,
        'Số lượng': p.quantity,
        'Đã bán': p.sold,
        'Trọng lượng': p.weight,
        'Mùi hương': p.fragrant
      })
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataExport);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'products.xlsx')
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

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
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
