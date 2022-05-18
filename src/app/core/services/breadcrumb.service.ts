import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { firstValueFrom } from "rxjs"
import { API } from "src/app/apiURL"

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  sidebarIndex = 1

  displayTitle(): string {
    switch (this.sidebarIndex) {
      case 1:
        return 'Trang chủ quản trị'
      case 2:
        return 'Quản lý danh mục'
      case 3:
        return 'Quản lý sản phẩm'
      case 4:
        return 'Quản lý đơn hàng'
      case 5:
        return 'Quản lý tài khoản'
      default:
        return 'Unknown'
    }
  }
}