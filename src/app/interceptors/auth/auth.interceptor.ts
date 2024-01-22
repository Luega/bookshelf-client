import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("login")) {
      if (this.authService.isAuth()) {
        const authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
        });
  
        return next.handle(authReq);
      }

      this.router.navigate(['/login']);
      return EMPTY;
    }
    
    return next.handle(request);
  }
}
