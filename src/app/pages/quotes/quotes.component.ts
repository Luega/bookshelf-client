import { Component, OnInit } from '@angular/core';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: IQuote[] = []

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data: IQuote[]) => this.quotes = data,
      error: (error) => console.log(error),      
    });
  }

  onCreateQuote(newQuote: IQuote) {
    this.quotes.pop();
    this.quotes.unshift(newQuote);
  }
}
