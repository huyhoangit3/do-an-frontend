import {Component, OnInit} from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { TokenStorageService } from '../core/services/auth/token-storage.service';
import { CategoryService } from '../core/services/category.service';
import { InvoiceService } from '../core/services/invoice.service';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private categoryService: CategoryService, 
    private productService: ProductService, 
    private authService: AuthService,
    private invoiceService: InvoiceService,
    private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().then(res => {
      this.categoryService.categories = res
    }).catch(err => {
      console.log(`Errors occurred when fetching all categories ${err.message}`);
    })

    // this.productService.getAllProducts().then(res => {
    //   this.productService.products = res
    // }).catch(err => {
    //   console.log(`Errors occurred when fetching all products ${err.message}`);
    // })
    if(this.authService.isLoggedIn()) {
      this.invoiceService.getInvoices(this.tokenService.getUser().id)
        .then(res => {
          this.invoiceService.invoices = res
        }).catch(err => {
          
        })
    }
  }
}
