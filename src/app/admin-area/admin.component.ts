import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/services/auth/token-storage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSidebarCollapsed = false
  sidebarIndex = 1

  constructor(private router: Router, 
    private tokenStorageService: TokenStorageService) {
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
