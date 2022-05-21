import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomerService } from 'src/app/core/services/customer.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  invoiceId: number
  products: Product[] = []
  invoice: any
  customer: any
  orderStatus: number
  statusDropdown = new FormControl()

  currentPage = 1
  itemsPerPage = 5
  count: number

  invoiceStatus = [
    { code: 0, status: 'Chờ xác nhận' },
    { code: 1, status: 'Đã xác nhận' },
    { code: 2, status: 'Đang lấy hàng' },
    { code: 3, status: 'Đang vận chuyển' },
    { code: 4, status: 'Đã giao' },
    { code: 5, status: 'Hủy' },
  ]

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private location: Location,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.count = 0
    this.activatedRoute.paramMap.subscribe({
      next: res => {
        this.invoiceId = Number(res.get('id'))
        this.getData(this.invoiceId)
      },
      error: err => {
      }
    })
    this.statusDropdown.valueChanges.subscribe({
      next: data => {
        if (this.count != 0) {
          this.invoiceService.updateStatus(this.invoiceId, data).then(res => {
            this.toast.success({
              detail: "Thông báo", summary: 'Cập nhật trạng thái đơn hàng thành công',
              sticky: false, duration: 3000, position: 'br'
            })
          }).catch(err => {
            this.toast.error({
              detail: "Thông báo", summary: 'Cập nhật trạng thái đơn hàng thất bại',
              sticky: false, duration: 3000, position: 'br'
            })
          })
        }
        this.count++;

      }, error: err => {
      }
    })
  }
  async getData(invoiceId) {
    await this.invoiceService.getInvoiceById(invoiceId).then(res => {
      console.log(res);
      this.invoice = res
      this.statusDropdown.setValue(res.status)
    }).then(err => {

    })

    await this.productService.getProductsInInvoice(invoiceId).then(res => {
      this.products = res
    }).catch(err => {

    })

    await this.customerService.getCustomerByInvoiceId(invoiceId).then(res => {
      this.customer = res
    }).catch(err => {

    })
  }

  onBack() {
    this.location.back()
  }
}
