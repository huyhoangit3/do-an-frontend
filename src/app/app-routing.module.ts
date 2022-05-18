import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin-area/admin.component";
import { AuthGuardService } from "./core/services/auth/auth-guard.service";
import { AdminLoginComponent } from './shared/components/admin-login/admin-login.component';


const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  loadChildren: () => import('./admin-area/admin.module').then(m => m.AdminModule),
  canActivate: [AuthGuardService]

},
{ path: 'admin-login', component: AdminLoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
