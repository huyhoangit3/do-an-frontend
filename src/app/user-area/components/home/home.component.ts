import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryService } from 'src/app/core/services/category.service';
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

  constructor(private toast: NgToastService,
    public productService: ProductService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then(res => {
      this.productService.products = res
    }).catch(err => {
      console.log(`Errors occurred when fetching all products ${err.message}`);
    })
  }

  onAddToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity)
  }
}
