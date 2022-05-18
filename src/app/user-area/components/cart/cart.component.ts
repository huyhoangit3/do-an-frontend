import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService, USER_KEY } from 'src/app/core/services/auth/token-storage.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'user-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {

  customerDetailsForm: FormGroup

  constructor(public cartService: CartService,
    private toast: NgToastService, private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router,
    public tokenStorage: TokenStorageService,
    private customerService: CustomerService,
    private orderService: OrderService, private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {    
    this.customerDetailsForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      note: [''],
      accountId: ['']
    })

    const currentUser = this.tokenStorage.getCurrentUser()

    if(currentUser) {
      this.customerService.getCustomerByAccountId(currentUser.id).then(res => {
        this.customerDetailsForm.patchValue({
          customerName: res.fullName, 
          phoneNumber: res.phone,
          deliveryAddress: res.address,
        })
      }).catch(err => {
        this.toast.error({
          detail: "Cảnh báo", summary: 'Lấy thông tin khách hàng lỗi!!!',
          sticky: false, duration: 2000, position: 'br'
        })
      })
    }
  }
  get customerName() {
    return this.customerDetailsForm.get('customerName')
  }
  get phoneNumber() {
    return this.customerDetailsForm.get('phoneNumber')
  }
  get deliveryAddress() {
    return this.customerDetailsForm.get('deliveryAddress')
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

  onOrder() {
    const products = []
    this.cartService.items.forEach(item => {
      products.push({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })
    })
    if (!this.authService.isLoggedIn()) {
      this.customerDetailsForm.patchValue({ accountId: 0 })
    } else {
      this.customerDetailsForm.patchValue({ accountId: this.tokenStorage.getCurrentUser().id })
    }

    const params = {
      products,
      customerDetails: this.customerDetailsForm.value
    }    
    console.log(params);
    

    this.orderService.order(params).then(res => {
      if(this.authService.isLoggedIn()) {
        this.invoiceService.getInvoicesByAccountId(this.tokenStorage.getCurrentUser().id)
        .then(res => {
          this.invoiceService.invoices = res
        }).catch(err => {
          
        })
      }
      this.toast.success({
        detail: "Thông báo", summary: 'Bạn đã đặt hàng thành công!!!',
        sticky: false, duration: 2000, position: 'br'
      })
      this.cartService.removeAllItems()
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2000)
      
    }).catch(err => {
      this.toast.error({
        detail: "Cảnh báo", summary: 'Đặt hàng không thành công!!!',
        sticky: false, duration: 2000, position: 'br'
      })
    })
  }



  ngAfterViewInit(): void {
  }

}
