import { Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";
import { Product } from "src/app/models/product.model";
import { ProductService } from "./product.service";

@Injectable({ providedIn: 'root' })
export class CartService {

  items: {product: Product, quantity: number}[] = []

  constructor(private productService: ProductService, private toast: NgToastService) { 
    this.getCartFromLocalStorage()
  }

  addToCart(product: Product, quantity: number) {
    if (this.items.length === 0) {
      this.items.push({ product, quantity })
      this.setCartToLocalStorage()
    } else {
      let index = this.items.findIndex(item => item.product.id === product.id)
      if (index === -1) {
        this.items.push({ product, quantity })
      } else {
        this.items[index].quantity = Number(this.items[index].quantity)
        if(this.items[index].quantity + quantity <= product.quantity) {
          this.items[index].quantity += quantity
          this.toast.success({
            detail: "Thông báo", summary: 'Đã thêm vào giỏ hàng',
            sticky: false, duration: 1500, position: 'br'
          })
          
        } else {
          this.toast.error({
            detail: "Thông báo", summary: 'Số lượng trong kho không đủ!!!',
            sticky: false, duration: 1500, position: 'br'
          })
        }
      }
    }
    this.setCartToLocalStorage()
  }

  removeItem(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId)
    this.setCartToLocalStorage()
  }

  removeAllItems() {
    this.items = []
    this.setCartToLocalStorage()
  }

  getCartFromLocalStorage() {
    if(window.localStorage.getItem('cart')) {
      this.items = JSON.parse(window.localStorage.getItem('cart'))
    }
    
  }
  setCartToLocalStorage() {
    window.localStorage.setItem('cart', JSON.stringify(this.items))
  }


}