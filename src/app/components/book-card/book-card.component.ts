import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book?: Book;
  @Output() bookRemoved = new EventEmitter<string>;

  constructor(private bookService: BookService) {}

  removeBook(id: string) {
    this.bookService.removeBook(id).subscribe({
      next: () => {
        this.bookRemoved.emit(id);
      },
      error: (error) => {
        console.log(error);
      } 
    });
  }
}
