import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { BookEditComponent } from './pages/book-edit/book-edit.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "books",
    pathMatch: 'full'
  },
  { 
    path: "books",
    component: BookshelfComponent,
    canActivate: [authGuard()],
  },
  {
    path: "books/add",
    component: BookAddComponent,
    canActivate: [authGuard()],
  },
  { 
    path: "books/edit/:id",
    component: BookEditComponent,
    canActivate: [authGuard()],
  },
  { 
    path: "books/:id",
    component: BookDetailsComponent,
    canActivate: [authGuard()],
  },
  { 
    path: "quotes",
    component: QuotesComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'login',
    component: LoginComponent
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
