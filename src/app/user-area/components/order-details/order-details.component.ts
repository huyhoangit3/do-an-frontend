import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  products: Product[] = []
  invoice: any
  customer: any
  currentPage = 1
  itemsPerPage = 5

  constructor(private invoiceService: InvoiceService,
    private productService: ProductService,
    private customerService: CustomerService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: res => {
        const invoiceId = Number(res.get('id'))
        this.productService.getProductsInInvoice(invoiceId).then(res => {
            this.getData(invoiceId)
          }).catch(err => {

          })
      },
      error: err => {

      }
    })
  }

  async getData(invoiceId) {
    await this.invoiceService.getInvoiceById(invoiceId).then(res => {
      console.log(res);
      this.invoice = res
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
}
