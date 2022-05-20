import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../shared/components/login/login.component";
import { NotfoundComponent } from '../shared/components/notfound/notfound.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from './components/home/home.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ProductComponent } from "./components/product/product.component";
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from "./components/signup/signup.component";
import { SupportComponent } from "./components/support/support.component";
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'support', component: SupportComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'products/:id/details', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '**',
        component: NotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
