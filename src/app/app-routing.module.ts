import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookshelfComponent } from './pages/bookshelf/bookshelf.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { authGuard } from './guards/auth/auth.guard';
import { BookFormComponent } from './pages/book-form/book-form.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: "books",
    component: BookshelfComponent,
    canActivate: [authGuard()],
  },
  {
    path: "books/add",
    component: BookFormComponent,
    canActivate: [authGuard()],
  },
  { 
    path: "books/edit/:id",
    component: BookFormComponent,
    canActivate: [authGuard()],
  },
  { 
    path: "quotes",
    component: QuotesComponent,
    canActivate: [authGuard()],
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
