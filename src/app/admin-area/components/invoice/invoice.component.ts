import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 5

  sortKey: string
  reverse: boolean


  invoiceStatus = [
    { code: 0, status: 'Chờ xác nhận' },
    { code: 1, status: 'Đã xác nhận' },
    { code: 2, status: 'Đang lấy hàng' },
    { code: 3, status: 'Đang vận chuyển' },
    { code: 4, status: 'Đã giao' },
    { code: 5, status: 'Hủy' },
  ]

  constructor(public invoiceService: InvoiceService,
    private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().then(res => {
      this.invoiceService.invoices = res
    }).catch(err => {

    })
  }

  sort(key: string) {
    this.sortKey = key
    this.reverse = !this.reverse
    this.invoiceService.invoices = this.orderPipe.transform(this.invoiceService.invoices, this.sortKey, this.reverse)
  }

  getColorRow(status: number) {
    switch (status) {
      case 0:
        return 'table-primary'
      case 1:
      case 2:
      case 3:
        return 'table-warning'
      case 4:
        return 'table-success'
      case 5:
        return 'table-danger'
      default:
        return 'table-danger'
    }
  }
}
