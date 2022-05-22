import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
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

  revenue = 0

  constructor(private categoryService: CategoryService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private customerService: CustomerService,
    private accountService: AccountService,
    public authService: AuthService,
    public tokenStorageService: TokenStorageService) {
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
      this.invoices = res.filter(i => {
        return i.status === 4
      })
      this.getRevenue()
    })
    this.accountService.getAllAccounts().then(res => {
      this.accounts = res
    })
    this.customerService.getAllCustomers().then(res => {
      this.customers = res
    })
  }

  getRevenue() {
    let revenue = 0
    
    for (let j = 0; j < this.invoices.length; j++) {
      this.productService.getProductsInInvoice(this.invoices[j].id).then(
        res => {
          for (let i = 0; i < res.length; i++) {
            this.revenue += res[i].quantity * res[i].price 
          }
        }
      )
    }
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
