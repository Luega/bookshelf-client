import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { Page404Component } from './pages/page404/page404.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { BookEditComponent } from './pages/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    BookDetailsComponent,
    BookAddComponent,
    BookEditComponent,
    QuotesComponent,
    Page404Component,
    HeaderComponent,
    FooterComponent,
    BookCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
