import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  imageSrc = 'http://localhost:8080/api/files/notfound.png'

  constructor(private formBuilder: FormBuilder,
     private authService: AuthService, private toast: NgToastService,
     private router: Router) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      imgUrl: [''],
    })
  }

  onChooseFile(event: any) {
    
  }
  onRegisterUser() {
    this.signUpForm.patchValue({imgUrl: 'demo.jpg'})
    this.authService.signUp(this.signUpForm).then(res => {
      this.router.navigate(['login'])
      this.toast.success({
        detail: "Thông báo", summary: 'Đăng ký tài khoản thành công!!!',
        sticky: false, duration: 2000, position: 'br'
      })
    }).catch(err => {
      console.log(`Error occurs when registering new user!!!`);
      this.toast.error({
        detail: "Thông báo", summary: 'Đăng ký tài khoản thất bại!!!',
        sticky: false, duration: 2000, position: 'br'
      })
    })
  }

  get userName() {
    return this.signUpForm.get('userName')
  }
  get password() {
    return this.signUpForm.get('password')
  }
  get email() {
    return this.signUpForm.get('email')
  }
  get fullName() {
    return this.signUpForm.get('fullName')
  }
  get address() {
    return this.signUpForm.get('address')
  }
  get phoneNumber() {
    return this.signUpForm.get('phoneNumber')
  }

}
