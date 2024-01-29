import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
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
  isloading: boolean = false;
  alertMessage: string="";
  constructor(private pdfService: WebtopdfService, fb: FormBuilder) {
    this.generateWebToPdf = fb.group({
      url: ['https://en.wikipedia.org/wiki/Web_browser', [Validators.required]],
      orientation: ['portrait', Validators.required],
      pageSize: ['letter', Validators.required],
    });
  }

  downloadPdf() {
    this.isloading = true;
    this.alertMessage=""
    this.pdfService.generatePdf(this.generateWebToPdf.value).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const filename=`${this.generateWebToPdf.value.url}.pdf`
        saveAs(blob, filename);
        console.log(res);
        this.isloading = false;
      },
      error: (error) => {
        this.isloading = false;
        this.alertMessage="failed"
        console.log(error);
      },
      complete: () => {
        this.alertMessage="complete"
      },
    });
  }
}
