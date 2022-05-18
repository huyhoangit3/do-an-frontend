import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { TokenStorageService } from '../core/services/auth/token-storage.service';
import { BreadcrumbService } from '../core/services/breadcrumb.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSidebarCollapsed = false
  sidebarIndex = 1

  constructor(private router: Router, 
    public authService: AuthService,
    public breadCrumb: BreadcrumbService,
    public tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed
  }
  onLogout() {
    this.tokenStorageService.signOut()
    this.router.navigate(['/'])
  }
}
