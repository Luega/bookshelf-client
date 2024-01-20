import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { BookEditComponent } from './pages/book-edit/book-edit.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    BookDetailsComponent,
    BookAddComponent,
    BookEditComponent,
    QuotesComponent,
    LoginComponent,
    Page404Component,
    HeaderComponent,
    FooterComponent,
    BookCardComponent,
    BookFormComponent,
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
