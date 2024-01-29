import { Component, Input } from '@angular/core';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent {
  @Input() quote?: IQuote;

  constructor(public darkMode: DarkModeService) {}
}
