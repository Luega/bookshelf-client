import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: IQuote[] = []
  timeOutMessage?: NodeJS.Timeout;
  errorMessage?: string;

  constructor(
    private quoteService: QuoteService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  ngOnDestroy() {
    if (this.timeOutMessage) {
      clearTimeout(this.timeOutMessage);
    }
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data: IQuote[]) => this.quotes = data,
      error: (error) => {
        console.log(error);
        if (error.error.status === 401) {
          this.router.navigate(['login'], { queryParams: { expired: 'true' } });
        } else {
          clearTimeout(this.timeOutMessage);
          this.errorMessage = "Something went wrong. Try again later."
          this.timeOutMessage = setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      },      
    });
  }

  onCreateQuote(event: IQuote | number) {
    if (typeof(event) === "object") {      
      this.quotes.pop();
      this.quotes.unshift(event);
    } else if ( event === 401) {
      this.router.navigate(["login"], { queryParams: { expired: 'true' } });
    } else {
      clearTimeout(this.timeOutMessage);
      this.errorMessage = "Something went wrong. Try again later."
      this.timeOutMessage = setTimeout(() => {
      this.errorMessage = '';
      }, 3000);
    }
  }
}
