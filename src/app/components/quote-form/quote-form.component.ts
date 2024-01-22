import { Router } from '@angular/router';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  @Output() createQuote = new EventEmitter<IQuote>;
  quoteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private quoteService: QuoteService,
  ) {
    this.quoteForm = this.formBuilder.group({
      text: [null, Validators.required],
      author: [null]
    });
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.quoteService.postQuotes(this.quoteForm.value).subscribe({
        next: () => this.createQuote.emit(this.quoteForm.value),
        error: (error) => console.log(error),
      });
    }
  }
}
