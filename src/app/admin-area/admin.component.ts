import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSidebarCollapsed = false
  sidebarIndex = 1

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed
  }
}
