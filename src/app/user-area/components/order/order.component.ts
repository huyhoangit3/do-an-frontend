import { Location } from '@angular/common';
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

  cancelOrderId: number

  constructor(public invoiceService: InvoiceService,
    private router: Router, 
    private location: Location,
    private orderService: OrderService,
    private tokenStorage: TokenStorageService,
    private toast: NgToastService) {

  }

  ngOnInit(): void {
  }

  onViewInvoiceDetails(id: number) {
    this.router.navigate(['order-details', id])
  }

  onCancelOrderButtonClicked(orderId: number) {
    this.cancelOrderId = orderId
  }

  onCancelOrder() {
    this.orderService.cancelOrder(this.cancelOrderId).then(res => {
      this.toast.success({
        detail: "Thông báo", summary: 'Hủy đơn hàng thành công',
        sticky: false, duration: 3000, position: 'br'
      })
      this.invoiceService.getInvoicesByAccountId(this.tokenStorage.getCurrentUser().id).then(res => {
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

  onBack() {
    this.location.back()
  }
}
