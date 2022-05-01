import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CategoryComponent } from './components/category/category.component';
import {HomeComponent} from "./components/home/home.component";
import { InvoiceComponent } from './components/invoice/invoice.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'invoices', component: InvoiceComponent},
      {path: 'accounts', component: AccountComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
