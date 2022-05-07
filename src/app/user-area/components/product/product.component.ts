import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { filter, Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'user-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  currentPage = 1
  itemsPerPage = 10
  activatedRouteSub: Subscription

  constructor(private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private toast: NgToastService,
    public cartService: CartService) {
  }

  ngOnInit(): void {
    this.activatedRouteSub = this.activatedRoute.queryParams.pipe(
      filter(params => params['categoryId']))
      .subscribe({
        next: res => {
          this.productService
            .findProductsByCategoryId(res['categoryId']).then(res => {
              this.productService.products = res
            }).catch(err => {

            })
        }
      }
    )
  }

  onAddToCart(product: Product, quantity: number) {
    this.toast.success({
      detail: "Thông báo", summary: 'Đã thêm vào giỏ hàng',
      sticky: false, duration: 1500, position: 'br'
    })
    this.cartService.addToCart(product, quantity)
  }
  ngOnDestroy(): void {
    if (this.activatedRouteSub) {
      this.activatedRouteSub.unsubscribe()
    }
  }

}
