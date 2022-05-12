import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  currentTime: any = new Date()

  constructor(public invoiceService: InvoiceService,
    private router: Router) {

  }

  ngOnInit(): void {
  }

  onViewInvoiceDetails(id: number) {
    this.router.navigate(['order-details', id])
  }

}
