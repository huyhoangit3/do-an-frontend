import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgToastModule } from "ng-angular-popup";
import { NgxPaginationModule } from "ngx-pagination";
import { ImagePipe } from "../core/pipes/image.pipe";

@NgModule({
  declarations: [ImagePipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
  ],
  // exports is required so you can access your 
  // component/pipe in other modules
  exports: [
    ImagePipe, 
    FormsModule,
    ReactiveFormsModule,
    NgToastModule, 
    NgxPaginationModule
  ]
})
export class SharedModule { }