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
  imports: [FormsModule, ReactiveFormsModule],
  providers: [WebtopdfService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  generateWebToPdf: any;
  constructor(private pdfService: WebtopdfService, fb: FormBuilder) {
    this.generateWebToPdf = fb.group({
      url: ['', [Validators.required]],
      orientation: ['portrait', Validators.required],
      pageSize: ['letter', Validators.required],
    });
  }

  downloadPdf() {
    this.pdfService.generatePdf(this.generateWebToPdf.value).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Open the downloaded PDF in a new browser tab
        window.open(url, '_blank');

        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
