import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {AuthGuardService} from "../core/services/auth/auth-guard.service";

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
  ],
  imports: [
    AdminRoutingModule
  ],

  bootstrap: [AdminComponent]
})
export class AdminModule {
}
