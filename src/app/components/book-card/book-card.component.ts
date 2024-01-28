import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from 'src/app/models/book/book.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book?: IBook;
  @Output() bookRemovedEmitter = new EventEmitter<string | number>;
  isActiveModal: boolean = false;

  toggleModal() {
    this.isActiveModal = !this.isActiveModal;
  }

  removeBookHandler(id: string | number) {
    this.bookRemovedEmitter.emit(id);
  }
}
