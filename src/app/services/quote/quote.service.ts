import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuote } from 'src/app/models/quote/quote.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getQuotes(): Observable<IQuote[]> {
    return this.httpClient.get<IQuote[]>(environment.API_URL + "api/Quotes");
  }

  postQuotes(quote: IQuote) {
    return this.httpClient.post(environment.API_URL + "api/Quotes", quote);
  }
}
