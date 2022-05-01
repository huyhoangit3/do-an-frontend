import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  currentTime: any = new Date()
  constructor() {
  }

  ngOnInit(): void {
  }

}
