import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { MessageComponent } from './components/message/message.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    QuotesComponent,
    LoginComponent,
    Page404Component,
    HeaderComponent,
    FooterComponent,
    BookCardComponent,
    BookFormComponent,
    QuoteCardComponent,
    QuoteFormComponent,
    MessageComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
