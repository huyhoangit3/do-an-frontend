import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1
  arr: number[] = []

  constructor(private toast: NgToastService) { }

  ngOnInit(): void {
    this.arr = [...Array(50).keys()];
  }
  onAddToCart() {
    this.toast.success({detail:"INFO",summary:'Your Info Message', 
    sticky:false, duration: 1500, position: 'br'})

  }
}
