import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 5

  constructor(public invoiceService: InvoiceService,
    private router: Router, 
    private orderService: OrderService,
    private tokenStorage: TokenStorageService,
    private toast: NgToastService) {

  }

  ngOnInit(): void {
  }

  onViewInvoiceDetails(id: number) {
    this.router.navigate(['order-details', id])
  }
  onCancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).then(res => {
      this.toast.success({
        detail: "Thông báo", summary: 'Hủy đơn hàng thành công',
        sticky: false, duration: 3000, position: 'br'
      })
      this.invoiceService.getInvoices(this.tokenStorage.getUser().id).then(res => {
        this.invoiceService.invoices = res
      }).catch(err => {
        
      })
    }).catch(err => {
      this.toast.error({
        detail: "Thông báo", summary: 'Hủy đơn hàng không thành công',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }

}
