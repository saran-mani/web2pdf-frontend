import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WebtopdfService } from '../service/webtopdf.service';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [WebtopdfService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  generateWebToPdf: any;
  url: string = '';
  constructor(private pdfService: WebtopdfService, fb: FormBuilder) {
    this.generateWebToPdf = fb.group({
      url: ['', [Validators.required]],
    });
  }

  submitUrl() {
    console.log(this.generateWebToPdf.value.url);
    this.pdfService.generatePdf(this.url).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log('pdf generated');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('webtopdf process completed');
      },
    });
  }
}
