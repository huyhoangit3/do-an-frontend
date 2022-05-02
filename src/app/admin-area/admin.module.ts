import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {AuthGuardService} from "../core/services/auth/auth-guard.service";
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AccountComponent } from './components/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    ProductsComponent,
    CategoryComponent,
    InvoiceComponent,
    AccountComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],

  bootstrap: [AdminComponent]
})
export class AdminModule {
}
