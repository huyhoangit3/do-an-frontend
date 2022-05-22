import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private toast: NgToastService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute, private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onLogin() {
    this.authService.signIn(this.loginForm).then(res => {
      this.tokenStorageService.saveToken(res.token)
      this.authService.getCurrentUser().then(res => {
        if(this.authService.isAdmin(res) || this.authService.isModerator(res)) {
          this.router.navigate(['/admin/home'])
          this.tokenStorageService.saveUser(res)
          this.toast.success({
            detail: " Thông báo", summary: 'Đăng nhập thành công với quyền quản trị', sticky: false,
            duration: 3000, position: 'br'
          })
        } else {
          this.tokenStorageService.signOut()
          this.toast.error({
            detail: " Thông báo", summary: 'Không có quyền truy cập!', sticky: false,
            duration: 3000, position: 'br'
          })
        }
      }).catch(err => {
        this.toast.error({
          detail: " Thông báo", summary: 'Lấy thông tin tài khoản thất bại', sticky: false,
          duration: 3000, position: 'br'
        })
        console.log(`Error occurs when fetching current logged in user: ${err.message}!`)
      })
      
    }).catch(err => {
      console.log(`Error occurs when getting JWT token ${err.message}`);
      this.toast.error({
        detail: " Thông báo", summary: 'Thông tin đăng nhập không chính xác!', sticky: false,
        duration: 3000, position: 'br'
      })
    })
  }
  onBack() {
    this.location.back()
  }
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}