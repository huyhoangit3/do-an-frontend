import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin-area/admin.component";
import {AuthGuardService} from "./core/services/auth/auth-guard.service";


const routes: Routes = [{
  // admin not to be preload
  // config for lazy loading
  path: 'admin',
  component: AdminComponent,
  loadChildren: () => import('./admin-area/admin.module').then(m => m.AdminModule),
  // custom preloading stratery
  // data: {preload: true, delay: 3000},
  // prevent unauthorized user load lazy modules.
  canActivate: [AuthGuardService]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
