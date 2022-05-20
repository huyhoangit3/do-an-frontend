import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgToastModule } from "ng-angular-popup";
import { NgxPaginationModule } from "ngx-pagination";
import { authInterceptorProviders } from "../core/interceptors/auth-interceptor";
import { ImagePipe } from "../core/pipes/image.pipe";
import { CustomeDate } from "../core/pipes/mydate.pipe";
import { OrderStatusPipe } from "../core/pipes/order-status.pipe";
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

@NgModule({
  declarations: [ImagePipe, OrderStatusPipe,
    LoginComponent, NotfoundComponent,
    AdminLoginComponent, CustomeDate],
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
    CustomeDate,
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