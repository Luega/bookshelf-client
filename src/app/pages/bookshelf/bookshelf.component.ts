import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/models/book/book.interface';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit, OnDestroy {
  timeOutMessage?: NodeJS.Timeout;
  errorMessage?: string;
  books: IBook[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
    ) { }

  ngOnInit(): void {
      this.loadBooks();  
  }

  ngOnDestroy() {
    if (this.timeOutMessage) {
      clearTimeout(this.timeOutMessage);
    }
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.bookService.convertStringDatesToObjects(this.books);
      },
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
      }
    });
  }

  onBookRemoved(event: string | number) {
    if (typeof(event) === "string") {
      this.books = this.books.filter((b) => b.id !== event)
    } else if (event === 404) {
      clearTimeout(this.timeOutMessage);
      this.errorMessage = "Book not found."
      this.timeOutMessage = setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    } else if (event === 401) {
      this.router.navigate(['login'], { queryParams: { expired: 'true' } });
    } else {
      clearTimeout(this.timeOutMessage);
      this.errorMessage = "Something went wrong. Try again later."
      this.timeOutMessage = setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
}
