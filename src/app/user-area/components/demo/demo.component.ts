import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-storage/file-upload.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  uploadedFile!: File
  imageSrc!: string

  constructor(private fileService: FileUploadService) { }

  ngOnInit(): void {
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

}
