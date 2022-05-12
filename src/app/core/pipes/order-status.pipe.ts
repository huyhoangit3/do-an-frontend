import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value) {
      case 0:
        return 'Chờ xác nhận'
      case 1:
        return 'Đã xác nhận'
      case 2:
        return 'Đang lấy hàng'
      case 3:
        return 'Đang vận chuyển'
      case 4:
        return 'Đã giao'
      case 5:
        return 'Đã hủy'
      default:
        return 'Unknown status'
    }
  }

}
