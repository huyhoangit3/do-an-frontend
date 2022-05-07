import {Component, OnInit} from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private categoryService: CategoryService, 
    private productService: ProductService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().then(res => {
      this.categoryService.categories = res
    }).catch(err => {
      console.log(`Errors occurred when fetching all categories ${err.message}`);
    })

    // this.productService.getAllProducts().then(res => {
    //   this.productService.products = res
    // }).catch(err => {
    //   console.log(`Errors occurred when fetching all products ${err.message}`);
    // })
  }
}
