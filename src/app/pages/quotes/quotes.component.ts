import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/models/message/message-type.enum';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { MessageService } from 'src/app/services/message/message.service';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: IQuote[] = []

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    public messageService: MessageService,
    ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  ngOnDestroy() {
    if (this.messageService.timeOutMessage) {
      clearTimeout(this.messageService.timeOutMessage);
    }
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data: IQuote[]) => this.quotes = data,
      error: (error) => {
        if (error.error.status === 401) {
          this.router.navigate(['login'], { queryParams: { expired: 'true' } });
        } else {
          this.messageService.setMessageTimeOut(
            {
              text: "Something went wrong. Try again later.",
              type: MessageType.error
            }
          );
        }
      },      
    });
  }

  onCreateQuote(event: IQuote | number) {
    if (typeof(event) === "object") {      
      this.quotes.pop();
      this.quotes.unshift(event);
      this.messageService.setMessageTimeOut(
        {
          text: "New quote created.",
          type: MessageType.success
        }
      );
    } else if ( event === 401) {
      this.router.navigate(["login"], { queryParams: { expired: 'true' } });
    } else {
      this.messageService.setMessageTimeOut(
        {
          text: "Something went wrong. Try again later.",
          type: MessageType.error
        }
      );
    }
  }
}
