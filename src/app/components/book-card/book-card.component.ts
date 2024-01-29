import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookGenre } from 'src/app/models/book/book-genre.enum';
import { IBook } from 'src/app/models/book/book.interface';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book?: IBook;
  @Output() bookRemovedEmitter = new EventEmitter<string | number>;
  isActiveModal: boolean = false;
  bookGenre = BookGenre;

  constructor(public darkMode: DarkModeService) {}

  toggleModal() {
    this.isActiveModal = !this.isActiveModal;
  }

  removeBookHandler(id: string | number) {
    this.bookRemovedEmitter.emit(id);
  }
}
