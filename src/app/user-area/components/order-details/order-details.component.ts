import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  products: Product[] = []
  currentPage = 1
  itemsPerPage = 5

  constructor(private invoiceService: InvoiceService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: res => {
        this.invoiceService.getProductsInInvoice(
          Number(res.get('id'))).then(res => {
            this.products = res
          }).catch(err => {

          })
      },
      error: err => {

      }
    })
  }

}
