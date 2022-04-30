import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isActive = false

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.isActive = !this.isActive
  }

}
