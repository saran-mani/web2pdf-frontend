import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebtopdfService {

  constructor(private http:HttpClient) { }

  generatePdf(url:string): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/generatepdf`,url)
  }
}
