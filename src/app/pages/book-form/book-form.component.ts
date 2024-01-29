import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/models/book/book.interface';
import { BookService } from 'src/app/services/book/book.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})

export class BookFormComponent implements OnInit {
  bookGenresArray: string[] = this.bookService.bookGenreArray;
  bookForm: FormGroup;
  bookToEdit?: IBook;

  constructor(
    private formBuilder: FormBuilder, 
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    public darkMode: DarkModeService
    ) {
      this.bookForm = this.formBuilder.group({
        title: [null, Validators.required],
        author: [null, Validators.required],
        genre: ["init", Validators.required],
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
          this.bookForm = this.formBuilder.group({
            title: [this.bookToEdit.title, Validators.required],
            author: [this.bookToEdit.author, Validators.required],
            genre: [this.bookToEdit.genre, Validators.required],
            pageCount: [this.bookToEdit.pageCount, Validators.required],
            price: [this.bookToEdit.price, Validators.required],
            publishDate: [this.bookService.formatDateYYYYMMDD(this.bookToEdit.publishDate) , Validators.required],
          });        
        },
        error: (error) => {
          if (error.error.status === 401) {
            this.router.navigate(['login'], { queryParams: { expired: 'true' } });
          } else if (error.error.status === 404) {
            this.router.navigate(['books'], { queryParams: { found: 'false' } });
          } else {
            this.router.navigate(['books'], { queryParams: { error: 'true' } });
          }
        },
      });
    };
  }

  onSubmit() {
    if (this.bookForm.valid && this.bookForm.value.genre !== 'init') {
      this.bookForm.value.genre = Number(this.bookForm.value.genre);
      
      if (this.bookToEdit) {     
        if (this.bookForm.dirty) {        
          this.bookService.putBook(this.bookToEdit.id!, this.bookForm.value).subscribe({
            next: () => this.router.navigate(['/books'], { queryParams: { edit: 'true' } }),
            error: (error) => {
              if (error.error.status === 401) {
                this.router.navigate(['login'], { queryParams: { expired: 'true' } });
              } else {
                this.router.navigate(['books'], { queryParams: { error: 'true' } });
              }
            },
          });       
        } else {
          this.router.navigate(['/books'], { queryParams: { edit: 'true' } });
        }        
      } else {
        this.bookService.postBook(this.bookForm.value).subscribe({
          next: () => this.router.navigate(["/books"], { queryParams: { add: 'true' } }),
          error: (error) => {
            if (error.error.status === 401) {
              this.router.navigate(['login'], { queryParams: { expired: 'true' } });
            } else {
              this.router.navigate(['books'], { queryParams: { error: 'true' } });
            }
          },       
        });
      }
    } 
  }
}
