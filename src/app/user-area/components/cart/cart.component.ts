import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'user-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {

  constructor(public cartService: CartService,
    private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  onRemoveItem(productId: number) {
    this.cartService.removeItem(productId)
  }

  onRemoveAllItems() {
    this.cartService.removeAllItems()
  }

  onQuantityChange(productId, event, ipQuantity) {
    this.cartService.items.forEach(item => {
      if (item.product.id === productId) {
        let quantityNum = Number(event)
        if (quantityNum > item.product.quantity) {
          item.quantity = item.product.quantity
          ipQuantity.value = item.product.quantity
          this.toast.error({
            detail: "Cảnh báo", summary: 'Số lượng sản phẩm còn lại không đủ!',
            sticky: false, duration: 2000, position: 'br'
          })
        } else {
          item.quantity = quantityNum
        }
        this.cartService.setCartToLocalStorage()
      }
    })
  }
  getTotalPrice() {
    let total = 0;
    this.cartService.items.forEach(item => {
      total += item.product.price * item.quantity
    })
    return total
  }
  ngAfterViewInit(): void {
  }

}
