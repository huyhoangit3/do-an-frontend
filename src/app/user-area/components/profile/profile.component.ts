import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from 'src/app/core/services/account.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file.service';
import { API } from 'src/app/apiURL';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  currentUser: any
  currentCustomer: any;
  profileForm: FormGroup
  // file will be uploaded
  uploadedFile: File
  // this variable is used to stored name of chosen file
  chosenFile: string
  imageSrc = ''

  constructor(public tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private fileService: FileUploadService,
    private customerService: CustomerService,
    private accountService: AccountService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData() {
    this.currentUser = this.tokenStorage.getCurrentUser()
    await this.customerService.getCustomerByAccountId(this.currentUser.id)
    .then(res => {
      this.currentCustomer = res
    }).catch(err => {

    })
    this.imageSrc = `${API.FILE}/${this.currentUser.imgUrl}`
    this.profileForm = this.formBuilder.group({
      userName: [this.currentUser.userName, Validators.required],
      email: [this.currentUser.email, Validators.required],
      fullName: [this.currentCustomer.fullName, Validators.required],
      address: [this.currentCustomer.address, Validators.required],
      phoneNumber: [this.currentCustomer.phone, Validators.required],
      imgUrl: [this.currentUser.imgUrl],
    })
    this.profileForm.disable()
  }

  async onChangeProfile() {
    if (this.profileForm.disabled) {
      this.profileForm.enable()
    } else {
      if (this.chosenFile !== this.currentUser.imgUrl) {
        await this.fileService.uploadFile(this.uploadedFile).then(res => {
          this.profileForm.patchValue({ imgUrl: res.filename })
        }).catch(err => {
          console.log('Upload file failed!')
          this.toast.error({
            detail: "Cảnh báo", summary: 'Lỗi tải lên file',
            sticky: false, duration: 3000, position: 'br'
          })
          return
        })
      }

      this.accountService.updateAccount(this.currentUser.id, this.profileForm)
        .then(res => {
          this.toast.success({
            detail: "Thông báo", summary: 'Cập nhật thông tin tài khoản thành công!!',
            sticky: false, duration: 3000, position: 'br'
          })
          this.authService.getCurrentUser().then(res => {
            this.tokenStorage.saveUser(res)
            this.currentUser = res;
            this.imageSrc = 'http://localhost:8080/api/files/' + this.currentUser.imgUrl
          }).catch(err => {
            this.toast.error({
              detail: "Cảnh báo", summary: 'Lấy thông tin người dùng thất bại!!',
              sticky: false, duration: 3000, position: 'br'
            })
          })
        }).catch(err => {
          this.toast.error({
            detail: "Cảnh báo", summary: 'Cập nhật thông tin tài khoản thất bại!!',
            sticky: false, duration: 3000, position: 'br'
          })
        })
      this.profileForm.disable()
    }
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

  get userName() {
    return this.profileForm.get('userName')
  }
  get email() {
    return this.profileForm.get('email')
  }
  get fullName() {
    return this.profileForm.get('fullName')
  }
  get address() {
    return this.profileForm.get('address')
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber')
  }

}
