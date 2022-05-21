import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  isShowProductReport = false
  isShowCategoryReport = false
  top6Products: any
  categories: any

  // bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        align: 'center'
      },

      title: {
        text: 'Biểu đồ 1: Top 6 sản phẩm bán chạy',
        display: true,
        position: 'bottom'
      }
    }
  };
  barChartLabels = [];
  barChartLegend = true;
  barChartPlugins = [];
  colors = ['#FF5D5D', '#F9D923', '#3BACB6', '#F73D93', '#764AF1', '#55D8C1']
  barChartData: any[] = [];

  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        align: 'center'
      },

      title: {
        text: 'Biểu đồ 2: Số lượng sản phẩm trong các danh mục',
        display: true,
        position: 'bottom'
      }
    }
  };
  public pieChartData: any = {
    datasets: [{ data: [] }],
    labels: []
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(public productService: ProductService, private toast: NgToastService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.productService.getTopProducts().then(res => {
      let i = 0
      this.top6Products = res
      this.top6Products.forEach(p => {
        this.barChartData.push({
          data: [p.sold], label: p.name,
          backgroundColor: this.colors[i]
        })
        ++i
      });
      this.isShowProductReport = true
    })

    this.getAllCategories()
  }

  getAllCategories() {
    let arr = []
    this.categoryService.getAllCategories().then(
      res => {
        this.categories = res
        this.categories.forEach(c => {
          this.pieChartData.labels.push(c.name)
          this.productService.findProductsByCategoryId(c.id).then(res => {
            arr.push(res.length)
          })
        })
        setTimeout(() => {
          let sumArr = arr.reduce((a, b) => a + b, 0)
          arr.forEach(e => {
            this.pieChartData.datasets[0].data.push(e / sumArr * 100)
          })
          this.isShowCategoryReport = true
        }, 200)

      }
    ).catch(err => {
      console.log(`Can not get list of categories: ${err.message}`)
      this.toast.error({
        detail: "Cảnh báo", summary: 'Lỗi không thể lấy danh sách danh mục',
        sticky: false, duration: 3000, position: 'br'
      })
    })
  }
}
