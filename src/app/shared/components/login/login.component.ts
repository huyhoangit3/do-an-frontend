import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toast: NgToastService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.toast.info({detail:"INFO",summary:'Your Info Message',sticky:false, duration: 3000, position: 'br'})
  }

}
