import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import {HeaderComponent} from "./components/header/header.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {FooterComponent} from "./components/footer/footer.component";
import { SupportComponent } from './components/support/support.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';

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
    SignupComponent
  ],
  imports: [
    UserRoutingModule
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }
