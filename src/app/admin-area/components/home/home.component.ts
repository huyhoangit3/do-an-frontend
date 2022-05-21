import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = []
  invoices = []
  products = []
  customers = []
  accounts = []
  constructor(private categoryService: CategoryService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private customerService: CustomerService,
    private accountService: AccountService,) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.categoryService.getAllCategories().then(res => {
      this.categories = res
    })
    this.productService.getAllProducts().then(res => {
      this.products = res
    })
    this.invoiceService.getAllInvoices().then(res => {
      this.invoices = res
    })
    this.accountService.getAllAccounts().then(res => {
      this.accounts = res
    })
    this.customerService.getAllCustomers().then(res => {
      this.customers = res
    })
  }

  getSuccessInvoices() {
    return this.invoices.filter(i => {
      return i.status === 4
    })
  }

  getActiveAccounts() {
    return this.accounts.filter(a => {
      return a.status === true
    })
  }

  getTotalProduct() {
    let total: number = 0
    this.products.forEach(p => {
      total += Number.parseInt(p.quantity)
    })
    return total
  }
}
