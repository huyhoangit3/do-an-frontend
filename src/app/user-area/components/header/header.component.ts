import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
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
  categoryId: any

  constructor(public productService: ProductService,
    public categoryService: CategoryService,
    public cartService: CartService,
    public invoiceService: InvoiceService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public tokenStorageService: TokenStorageService,
    private router: Router, private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        if (params['categoryId']) {
          this.categoryId = params['categoryId']
        } else {
          this.categoryId = null
        }
      }
    })
    this.searchControl.valueChanges.pipe(
      tap(() => { }),
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
        if(this.categoryId) {
          this.productService.products = res.filter(p => p.category.id == this.categoryId)
        } else {
          this.productService.products = res
        }
      },
      error: err => console.log(`Errors occurred when searching products: ${err.message}`)
    })
  }
  onLogout() {
    this.authService.signOut()
    this.invoiceService.invoices = []
    this.cartService.items = []
    this.router.navigate(['/'])
    this.toast.success({
      detail: "Th??ng b??o", summary: '????ng xu???t th??nh c??ng',
      sticky: false, duration: 2000, position: 'br'
    })
  }
}
