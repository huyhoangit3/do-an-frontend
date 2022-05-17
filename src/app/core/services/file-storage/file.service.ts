import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { API } from 'src/app/apiURL';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Promise<{filename: string}> {
    const formData = new FormData();
    formData.append('file', file, file.name)
    return firstValueFrom(this.http.post<any>(`${API.FILE}/upload`, formData))
  }

  getFile(fileName: string) {
    return this.http.get(`${API}/images/${fileName}`, {responseType: 'blob'})
  }
}
