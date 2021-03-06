import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, Color } from 'chart.js';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/core/services/category.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  isShowProductReport = false
  isShowCategoryReport = false
  isShowRevenue = false
  top6Products = []
  categories = []
  products = []
  arr = []
  invoices = []

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
    animation: {
      duration: 0
    },
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

  // line chart
  lineChartData: any = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Doanh thu',
      borderColor: 'rgba(148,159,177,1)', pointBackgroundColor: 'red', backgroundColor: 'rgba(148,159,177,0.2)',
      fill: 'origin'
    },
  ];



  lineChartLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };
  lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //========================

  constructor(public productService: ProductService,
    private invoiceService: InvoiceService,
    private toast: NgToastService,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.getTop6Products()

    this.getCategoryReport()

    this.getInvoiceReport()
  }

  getTop6Products() {
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
  }

  async getCategoryReport() {
    this.categories = await this.categoryService.getAllCategoriesAsync()
    for (let i = 0; i < this.categories.length; i++) {
      this.pieChartData.labels.push(this.categories[i].name)
      this.products = await this.productService.findProductsByCategoryIdAsync(this.categories[i].id)
      let total: number = 0
      this.products.forEach(e => {
        total += e.quantity
      })
      this.arr.push(total)
    }
    let sumArr = this.arr.reduce((a, b) => a + b, 0)
    this.arr.forEach(e => {
      this.pieChartData.datasets[0].data.push(e / sumArr * 100)
    })
    this.isShowCategoryReport = true
  }

  getInvoiceReport() {
    // lay tat ca don hang
    this.invoiceService.getAllInvoices().then(res => {
      this.invoices = res.filter(e => e.status === 4)
      this.invoices.sort((a, b) => {
        let aMonth = new Date(a.bookingTime).getMonth() + 1
        let bMonth = new Date(b.bookingTime).getMonth() + 1
        return aMonth - bMonth
      })
      for (let i = 0; i < 12; ++i) {
        for (let j = 0; j < this.invoices.length; j++) {
          let month = new Date(this.invoices[j].bookingTime).getMonth()
          if (month === i) {
            this.productService.getProductsInInvoice(this.invoices[j].id).then(
              res => {
                res.forEach(e => this.lineChartData[0].data[i] += e.quantity * e.price)
              }
            )
          }
        }
      }
      this.isShowRevenue = true
    })
  }
}
