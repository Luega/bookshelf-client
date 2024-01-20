import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/models/book/book.interface';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
      this.loadBooks();  
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.bookService.convertStringDatesToObjects(this.books);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onBookRemoved(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
  }
}
