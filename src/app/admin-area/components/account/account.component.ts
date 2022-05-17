import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 5

  accountId: number
  accountForm: FormGroup
  uploadedFile: File

  chosenFile: string
  imageSrc = `${environment.baseApiUrl}/images/notfound.png`

  accountRoles = [
    { code: 'ROLE_ADMIN', value: 'Người quản trị' },
    { code: 'ROLE_MODERATOR', value: 'Nhân viên' }
  ]

  constructor(public accountService: AccountService,
    private toast: NgToastService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().then(res => {
      this.accountService.accounts = res
    }).catch(err => {
      console.log(`Errors occurred when fetching accounts: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi lấy danh sách tài khoản',
        sticky: false, duration: 3000, position: 'br'
      })
    })

    this.accountForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      status: [true],
      priviledge: [''],
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

  onStatusChange(event) {
    const status = event.currentTarget.checked;
    this.accountService.updateAccountStatus(this.accountId, status)
    .then(res => {
      this.toast.success({
        detail: "Thông báo", summary: 'Cập nhật trạng thái tài khoản thành công',
        sticky: false, duration: 3000, position: 'br'
      })
    }).catch(err => {
      this.toast.error({
        detail: "Cảnh báo", summary: 'Cập nhật trạng thái tài khoản không thành công!',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }

  onRowClick(accountId: number) {
    this.accountId = accountId
  }

  onAddAccountClicked() {

  }

  onAddAccount() {
    console.log(this.accountForm.value);
    
  }

  get userName() {
    return this.accountForm.get('userName')
  }
  get password() {
    return this.accountForm.get('password')
  }
  get email() {
    return this.accountForm.get('email')
  }
  get status() {
    return this.accountForm.get('status')
  }
  get priviledge() {
    return this.accountForm.get('priviledge')
  }

}
