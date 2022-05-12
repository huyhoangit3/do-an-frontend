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
  retUrl: any = 'home'

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
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl')
      })
  }

  async onLogin() {
    await this.authService.generateToken(this.loginForm).then(res => {
      this.tokenStorageService.saveToken(res.token)
    }).catch(err => {
      console.log(`Error occurs when getting JWT token ${err.message}`);
      this.toast.error({
        detail: " Thông báo", summary: 'Đăng nhập không thành công', sticky: false,
        duration: 3000, position: 'br'
      })
      return
    })

    await this.authService.getCurrentUser().then(res => {
      this.tokenStorageService.saveUser(res)
      this.invoiceService.getInvoices(res.id)
        .then(res => {
          this.invoiceService.invoices = res
        }).catch(err => {
          this.toast.error({
            detail: " Thông báo", summary: 'Lấy thông tin đơn hàng thất bại!!!', sticky: false,
            duration: 3000, position: 'br'
          })
        })
    }).catch(err => {
      this.toast.error({
        detail: " Thông báo", summary: 'Lấy thông tin người dùng thất bại', sticky: false,
        duration: 3000, position: 'br'
      })
      console.log(`Error occurs when fetching current logged in user: ${err.message}!`)
      return
    })
    if (this.retUrl !== null) {
      this.router.navigate([this.retUrl]);
    } else {
      this.router.navigate(['home']);
    }
  }
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
