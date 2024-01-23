import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/models/book/book.interface';
import { MessageType } from 'src/app/models/message/message-type.enum';
import { BookService } from 'src/app/services/book/book.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit, OnDestroy {
  books: IBook[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    public messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.loadBooks(); 
    
    if (this.route.snapshot.queryParams['edit'] === "true") {
      this.messageService.setMessageTimeOut(
        {
          text: "Book updated.",
          type: MessageType.success
        }
      );
    }
    if (this.route.snapshot.queryParams['add'] === "true") {
      this.messageService.setMessageTimeOut(
        {
          text: "Book added.",
          type: MessageType.success
        }
      );
    }
    if (this.route.snapshot.queryParams['found'] === "false") {
      this.messageService.setMessageTimeOut(
        {
          text: "Book not found.",
          type: MessageType.error
        }
      );
    }
    if (this.route.snapshot.queryParams['error'] === "true") {
      this.messageService.setMessageTimeOut(
        {
          text: "Something went wrong. Try again later.",
          type: MessageType.error
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.messageService.timeOutMessage) {
      clearTimeout(this.messageService.timeOutMessage);
    }
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.bookService.convertStringDatesToObjects(this.books);
      },
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
      }
    });
  }

  onBookRemoved(event: string | number) {
    if (typeof(event) === "string") {
      this.books = this.books.filter((b) => b.id !== event);
      this.messageService.setMessageTimeOut(
        {
          text: "Book removed.",
          type: MessageType.success
        }
      );
    } else if (event === 404) {
      this.messageService.setMessageTimeOut(
        {
          text: "Book not found.",
          type: MessageType.error
        }
      );
    } else if (event === 401) {
      this.router.navigate(['login'], { queryParams: { expired: 'true' } });
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
