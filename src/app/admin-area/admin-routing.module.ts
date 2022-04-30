import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
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
