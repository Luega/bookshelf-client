import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ILoginCredentials } from 'src/app/models/auth/login-credentials.interface';
import { IAuthToken } from 'src/app/models/auth/authToken.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService
    ) { }

  logIn(authCredentials: ILoginCredentials): Observable<IAuthToken> { 
    return this.httpClient.post<IAuthToken>('https://localhost:7156/api/login', authCredentials);
  }

  logOut() {
    this.cookieService.delete('jwt');
    this.router.navigate(["/"]);
  }

  isAuth(): boolean {
    return this.cookieService.get("jwt") ? true : false;
  }

  setCookie(authToken: IAuthToken) {
    const {token, expDate} = authToken;
    this.cookieService.set('jwt', token, new Date(expDate));
  }

  getToken(): string {
    return this.cookieService.get('jwt');
  }
}
