import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/models/book/book.interface';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookToEdit?: IBook;
  bookGenresArray: string[] = this.bookService.bookGenreArray;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.addForm = this.formBuilder.group({
        title: [null, Validators.required],
        author: [null, Validators.required],
        genre: [null, Validators.required],
        pageCount: [null, Validators.required],
        price: [null, Validators.required],
        publishDate: [null, Validators.required],
      });
    }

  ngOnInit(): void {
    const bookId = this.route.snapshot.params["id"];
    if (bookId) {
      this.bookService.getBook(bookId).subscribe({
        next: (data) => {     
          this.bookToEdit = data;
          this.addForm = this.formBuilder.group({
            title: [this.bookToEdit.title, Validators.required],
            author: [this.bookToEdit.author, Validators.required],
            genre: [this.bookToEdit.genre, Validators.required],
            pageCount: [this.bookToEdit.pageCount, Validators.required],
            price: [this.bookToEdit.price, Validators.required],
            publishDate: [this.bookService.formatDateYYYYMMDD(this.bookToEdit.publishDate) , Validators.required],
          });        
        },
        error: (error) => console.log(error),
      });
    };
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.addForm.value.genre = Number(this.addForm.value.genre);
      
      if (this.bookToEdit) {
        console.log('edit');
        
      } else {
        this.bookService.postBook(this.addForm.value).subscribe({
          next: () => this.router.navigate(["/books"]),
          error: (error) => console.log(error),       
        });
      }
    } 
  }
}
