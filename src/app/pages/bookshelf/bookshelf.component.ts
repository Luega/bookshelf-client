import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
      this.loadBooks();  
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.convertStringDatesToObjects(this.books);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  convertStringDatesToObjects(bookArray: Book[]) {
    bookArray.map(book => {
      book.publishDate = new Date(book.publishDate);      
    });
  }

  onBookRemoved(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
  }
}
