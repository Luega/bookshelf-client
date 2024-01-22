import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuote } from 'src/app/models/quote/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getQuotes(): Observable<IQuote[]> {
    return this.httpClient.get<IQuote[]>("https://localhost:7156/api/Quote");
  }

  postQuotes(quote: IQuote) {
    return this.httpClient.post("https://localhost:7156/api/Quote", quote);
  }
}
