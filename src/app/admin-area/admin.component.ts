import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isActive = false

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.isActive = !this.isActive
  }
}
