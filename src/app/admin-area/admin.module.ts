import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {AuthGuardService} from "../core/services/auth/auth-guard.service";
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ProductsComponent} from './components/products/products.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    SidebarComponent,
    ProductsComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule
  ],

  bootstrap: [AdminComponent]
})
export class AdminModule {
}
