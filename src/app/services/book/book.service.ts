import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../../models/book/book.interface';
import { BookGenre } from 'src/app/models/book/book-genre.enum';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookGenreArray: string[] = Object.keys(BookGenre).filter((genre) => (isNaN(Number(genre))));

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(environment.API_URL + "api/Books");
  }

  getBook(id: string): Observable<IBook> {
    return this.httpClient.get<IBook>(environment.API_URL + "api/Books/" + id);
  }

  postBook(book: IBook) {
    return this.httpClient.post(environment.API_URL + "api/Books", book)
  }

  putBook(id: string, book: IBook) {
    return this.httpClient.put(environment.API_URL + "api/Books/" + id, book)
  }

  removeBook(id: string) {
    return this.httpClient.delete(environment.API_URL + "api/Books/" + id);
  }

  convertStringDatesToObjects(bookArray: IBook[]) {
    bookArray.map(book => {
      book.publishDate = new Date(book.publishDate);      
    });
  }

  formatDateYYYYMMDD(stringDate: Date) {
    const date = new Date(stringDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
}
