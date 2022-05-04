import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImagePipe } from '../core/pipes/image.pipe';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from './components/home/home.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ProductComponent } from "./components/product/product.component";
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportComponent } from './components/support/support.component';
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailsComponent,
    FooterComponent,
    SupportComponent,
    CartComponent,
    SignupComponent,
    ProfileComponent,
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  bootstrap: [UserComponent]
})
export class UserModule {
}
