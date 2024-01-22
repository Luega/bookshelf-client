import { Component, Input } from '@angular/core';
import { IQuote } from 'src/app/models/quote/quote.interface';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent {
  @Input() quote?: IQuote;
}
