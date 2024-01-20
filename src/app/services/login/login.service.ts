import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginCredentials } from 'src/app/models/login/login-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(loginCredentials: ILoginCredentials) {
    return this.httpClient.post('https://localhost:7156/api/Login', loginCredentials);
  }
}
