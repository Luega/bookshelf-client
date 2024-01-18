import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { BookEditComponent } from './pages/book-edit/book-edit.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "/books",
    pathMatch: 'full'
  },
  { 
    path: "books",
    component: BookshelfComponent,
  },
  { 
    path: "books/:id",
    component: BookDetailsComponent
  },
  { 
    path: "books/add-book",
    component: BookAddComponent
  },
  { 
    path: "books/edit-book",
    component: BookEditComponent
  },
  { 
    path: "quotes",
    component: QuotesComponent
  },
  { 
    path: "**",
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
