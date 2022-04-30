import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'user-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  arr: number[] = [1, 2, 3, 4]

  constructor() {
  }

  ngOnInit(): void {
  }

}
