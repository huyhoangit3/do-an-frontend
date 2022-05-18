import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from 'src/app/core/services/account.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file.service';
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
    public tokenService: TokenStorageService,
    private fileService: FileUploadService,
    private toast: NgToastService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.getAllAccounts()

    this.accountForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      status: [true],
      privilege: [''],
      imgUrl: ['']
    })
  }

  getAllAccounts() {
    this.accountService.getAllAccounts().then(res => {
      this.accountService.accounts = res
    }).catch(err => {
      console.log(`Errors occurred when fetching accounts: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi lấy danh sách tài khoản',
        sticky: false, duration: 3000, position: 'br'
      })
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

  async onAddAccount() {
    await this.fileService.uploadFile(this.uploadedFile).then(
      res => this.accountForm.patchValue({ imgUrl: res.filename })
    ).catch(err => {
      console.log('Upload file failed!', err.message)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi tải lên file',
        sticky: false, duration: 3000, position: 'br'
      })
      return
    })
    this.accountService.addAccount(this.accountForm).then(res => {
      this.getAllAccounts()
      this.toast.success({
        detail: "Thông báo", summary: 'Thêm tài khoản thành công',
        sticky: false, duration: 3000, position: 'br'
      })
      console.log('New account has added')
    }).catch(err => {
      console.log(`Errors occurred when adding new account: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi xảy ra khi thêm mới tài khoản',
        sticky: false, duration: 3000, position: 'br'
      })
    })
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
  get privilege() {
    return this.accountForm.get('privilege')
  }

}
