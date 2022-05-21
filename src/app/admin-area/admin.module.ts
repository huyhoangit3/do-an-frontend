import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { AccountComponent } from './components/account/account.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ProductsComponent,
    CategoryComponent,
    InvoiceComponent,
    AccountComponent,
    InvoiceDetailsComponent,
    ReportComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],

  bootstrap: [AdminComponent]
})
export class AdminModule {
}
