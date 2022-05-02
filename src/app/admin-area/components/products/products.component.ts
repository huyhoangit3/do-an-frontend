import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { FileUploadService } from 'src/app/core/services/file-storage/file-upload.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  currentTime: any = new Date()

  categories!: Category[]
  categoriesSubscription!: Subscription

  productForm!: FormGroup

  uploadedFile!: File
  imageSrc = 'https://bitsofco.de/content/images/2018/12/broken-1.png'

  constructor(private fileService: FileUploadService, private categoryService: 
    CategoryService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      categoryId: []
    })
  }

  onAddButtonClicked() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoriesSubscription = this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log('Errors occured: ' + err.message),
      complete: () => console.log('fetch successfully')
    })
  }

  onChooseFile(event: any) {
    this.uploadedFile = event.target.files[0];
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  onUploadFile() {
    this.fileService.uploadFile(this.uploadedFile).subscribe(
      {
        error: (err) => console.log('Upload file failed!'),
        complete: () => console.log('Upload successfully')
      }
    )
  }

  ngOnDestroy(): void {
      
  }
}
