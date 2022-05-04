import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage = 1
  itemsPerPage = 10

  constructor(private toast: NgToastService,
    public productService: ProductService,
    public categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.categoryService.getAllCategories().then(res => {
      this.categoryService.categories = res
    }).catch(err => {
      console.log(`Errors occurred when fetching all categories ${err.message}`);
    })

    this.productService.getAllProducts().then(res => {
      this.productService.products = res
    }).catch(err => {
      console.log(`Errors occurred when fetching all products ${err.message}`);
    })
  }

  onAddToCart() {
    this.toast.success({
      detail: "INFO", summary: 'Your Info Message',
      sticky: false, duration: 1500, position: 'br'
    })

  }
}
