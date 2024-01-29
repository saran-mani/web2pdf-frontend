import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WebtopdfService {

  constructor(private http:HttpClient) { }

  generatePdf(url:any){
    return this.http.post("https://web2pdf.onrender.com/generatepdf",url,{responseType:"arraybuffer"})
  }
}
