import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebtopdfService {

  constructor(private http:HttpClient) { }

  generatePdf(url:any){
    return this.http.post("http://localhost:3000/generatepdf",url,{responseType:"arraybuffer"})
  }
}
