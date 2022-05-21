import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { debounceTime, distinctUntilChanged, from, map, of, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 10

  filterOption = new FormControl('0')
  searchControl = new FormControl('')
  temp: any

  constructor(private toast: NgToastService,
    public productService: ProductService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then(res => {
      this.productService.products = res
      this.temp = [...res]
    }).catch(err => {
      console.log(`Errors occurred when fetching all products ${err.message}`);
    })

    this.searchControl.valueChanges.pipe(
      map(key => key.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(key => {
        if (key == '') {
          return this.productService.getAllProducts()
        } else {
          return of(this.productService.products.filter(p => p.name.includes(key)))
        }
      })
    ).subscribe({
      next: res => {
        this.productService.products = res
      },
      error: err => console.log(`Errors occurred when searching products: ${err.message}`)
    })


    this.filterOption.valueChanges.pipe(
      switchMap(key => {
        this.temp = [...this.productService.products]
        if (key == 0) {
          return this.productService.getAllProducts()
        } else if (key == 1) {
          return of(this.temp.sort((a, b) => {
            return b.sold - a.sold
          }))
        } else if (key == 2) {
          return of(this.temp.sort((a, b) => {
            return a.price - b.price
          }))
        } else
          return of(this.temp.sort((a, b) => {
            return b.price - a.price
          }))
      })
    ).subscribe({
      next: res => this.productService.products = res
    })
  }

  onAddToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity)
  }
}
