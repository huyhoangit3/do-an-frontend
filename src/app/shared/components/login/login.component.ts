import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private toast: NgToastService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute, private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async onLogin() {
    await this.authService.signIn(this.loginForm).then(res => {
      this.tokenStorageService.saveToken(res.token)
      this.authService.getCurrentUser().then(res => {
        if (this.authService.isUser(res)) {
          this.router.navigate(['home']);
          this.tokenStorageService.saveUser(res)
          this.toast.success({
            detail: " Thông báo", summary: 'Đăng nhập thành công', sticky: false,
            duration: 3000, position: 'br'
          })
          if(!this.authService.isAdmin(res) && !this.authService.isModerator(res)) {
            this.invoiceService.getInvoicesByAccountId(res.id)
            .then(res => {
              this.invoiceService.invoices = res
            }).catch(err => {
              this.toast.error({
                detail: " Thông báo", summary: 'Lấy thông tin đơn hàng thất bại!!!', sticky: false,
                duration: 3000, position: 'br'
              })
            })
          }
        } else {
          this.tokenStorageService.signOut()
          this.toast.error({
            detail: " Thông báo", summary: 'Đăng nhập không thành công', sticky: false,
            duration: 3000, position: 'br'
          })
        }

      }).catch(err => {
        this.toast.error({
          detail: " Thông báo", summary: 'Lấy thông tin người dùng thất bại', sticky: false,
          duration: 3000, position: 'br'
        })
        console.log(`Error occurs when fetching current logged in user: ${err.message}!`)
        return
      })
    }).catch(err => {
      console.log(`Error occurs when getting JWT token ${err.message}`);
      this.toast.error({
        detail: " Thông báo", summary: 'Đăng nhập không thành công', sticky: false,
        duration: 3000, position: 'br'
      })
      return
    })
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
