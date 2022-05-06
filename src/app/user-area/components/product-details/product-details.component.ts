import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'user-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product!: Product
  relatedProducts: Product[]
  hotProducts: Product[]
  activatedRouteSub: Subscription

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
  activatedRouteSub: Subscription
    this.activatedRouteSub = this.activatedRoute.paramMap.subscribe({
      next: params => this.productService
        .getProductById(Number(params.get('id')))
        .then(res => {
          this.product = res
          // this.relatedProducts = this.productService.products.filter(product => {
          //   return product.id !== this.product.id && product.category.id === this.product.category.id
          // })
          this.productService.findProductsByCategoryId(res.category.id).then(res => {
            this.relatedProducts = res.filter(p => p.id !== this.product.id)
          }).catch(err => console.log(`Error occurs when fetching products with categoryId = ${this.product.id}`)
          )
        })
        .catch(err => console.log(`Error occurs when fetching product with id = ${params.get('id')}`)
        )
    })

    this.productService.getTopProducts().then(res => {
      this.hotProducts = res
    }).catch(err => {
      console.log(`Error occurs when fetching top products`)
    })

  }
  ngOnDestroy(): void {
    if (this.activatedRouteSub) {
      this.activatedRouteSub.unsubscribe()
    }
  }


  onAddToCart() {

  }

}
