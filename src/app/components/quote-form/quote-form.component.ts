import { IQuote } from 'src/app/models/quote/quote.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

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
    private quoteService: QuoteService,
    public darkMode: DarkModeService
  ) {
    this.quoteForm = this.formBuilder.group({
      text: [null, Validators.required],
      author: [null]
    });
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.quoteService.postQuotes(this.quoteForm.value).subscribe({
        next: () => {
          this.createQuote.emit(this.quoteForm.value);
          this.quoteForm.reset();
        },
        error: (error) => {
          console.log(error);
          this.createQuote.emit(error.error.status);
          this.quoteForm.reset();
        },
      });
    }
  }
}
