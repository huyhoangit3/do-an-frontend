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

@NgModule({
  declarations: [ImagePipe, OrderStatusPipe, LoginComponent, NotfoundComponent],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
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
  ],
  providers: [authInterceptorProviders]
})
export class SharedModule { }