import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchControl = new FormControl('')
  
  constructor(public productService: ProductService,
    public categoryService: CategoryService, 
    public cartService: CartService,
    public invoiceService: InvoiceService,
    public authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      tap(() => {}),
      map(key => key.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(key => {
        if (key == '') {
          return this.productService.getAllProducts()
        } else {
          return this.productService.findProductsByName(key)
        }
      })
    ).subscribe({
      next: res => {
        this.productService.products = res
      },
      error: err => console.log(`Errors occurred when searching products: ${err.message}`)
    })
  }
  onLogout() {
    this.tokenStorageService.signOut()
    this.invoiceService.invoices = []
    this.cartService.items = []
    this.router.navigate(['/'])
  }
}
