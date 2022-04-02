import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './user.component';
import {ProductComponent} from "./components/product/product.component";
import {SupportComponent} from "./components/support/support.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CartComponent} from "./components/cart/cart.component";
import {LoginComponent} from "../shared/components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
  {path: '', component: UserComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductComponent},
      {path: 'support', component: SupportComponent},
      {path: 'products/details', component: ProductDetailsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
