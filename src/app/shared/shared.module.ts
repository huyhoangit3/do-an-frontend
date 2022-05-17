import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgToastModule } from "ng-angular-popup";
import { NgxPaginationModule } from "ngx-pagination";
import { authInterceptorProviders } from "../core/interceptors/auth-interceptor";
import { ImagePipe } from "../core/pipes/image.pipe";
import { OrderStatusPipe } from "../core/pipes/order-status.pipe";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ImagePipe, OrderStatusPipe, LoginComponent, NotfoundComponent, AdminLoginComponent],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
    CommonModule
  ],
  // exports is required so you can access your 
  // component/pipe in other modules
  exports: [
    ImagePipe, 
    OrderStatusPipe,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule, 
    RouterModule,
    NgxPaginationModule,
    CommonModule
  ],
  providers: [authInterceptorProviders]
})
export class SharedModule { }