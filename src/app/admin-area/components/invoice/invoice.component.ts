import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 5


  invoiceStatus = [
    {code: 0, status: 'Chờ xác nhận'},
    {code: 1, status: 'Đã xác nhận'},
    {code: 2, status: 'Đang lấy hàng'},
    {code: 3, status: 'Đang vận chuyển'},
    {code: 4, status: 'Đã giao'},
    {code: 5, status: 'Hủy'},
  ]

  constructor(public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().then(res => {
      this.invoiceService.invoices = res
    }).catch(err => {

    })
  }
  onViewInvoiceDetails(id: number) {

  }

  onStatusChange(event) {
    console.log(event);
    
  }

}
