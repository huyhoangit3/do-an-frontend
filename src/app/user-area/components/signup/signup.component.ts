import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file.service';

@Component({
  selector: 'user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  // file will be uploaded
  uploadedFile: File
  // this variable is used to stored name of chosen file
  chosenFile: string
  imageSrc = 'http://localhost:8080/api/files/notfound.png'

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, 
    private toast: NgToastService,
    private location: Location,
    private router: Router, private fileService: FileUploadService) {
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

  // start choose file feature
  onChooseFile(event: any) {
    this.uploadedFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.chosenFile = file.name
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  // end choose file feature
  async onRegisterUser() {
    await this.fileService.uploadFile(this.uploadedFile).then(
      res => this.signUpForm.patchValue({ imgUrl: res.filename })
    ).catch(err => {
      console.log('Upload file failed!')
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi tải lên file',
        sticky: false, duration: 3000, position: 'br'
      })
      return
    })

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
  onBack() {
    this.location.back()
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
