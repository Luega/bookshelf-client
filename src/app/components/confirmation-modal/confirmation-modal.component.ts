import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() question: string = "Do you want to confirm?";
  @Input() bookId?: string;
  @Output() bookRemoved = new EventEmitter<string>;
  @Output() toggleModal = new EventEmitter;

  constructor(private bookService: BookService) {}

  closeModal() {
    this.toggleModal.emit();
  }

  removeBook(id: string) {    
    this.bookService.removeBook(id).subscribe({
      next: () => {
        this.bookRemoved.emit(id);
      },
      error: (error) => {
        this.bookRemoved.emit(error.error.status);
      } 
    });
  }
}
