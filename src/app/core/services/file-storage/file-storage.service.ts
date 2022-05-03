import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Promise<{filename: string}> {
    const formData = new FormData();
    formData.append('file', file, file.name)
    return firstValueFrom(this.http.post<any>('http://localhost:8080/api/files/upload/', formData))
  }
}
