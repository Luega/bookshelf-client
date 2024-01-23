import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuthToken } from 'src/app/models/auth/authToken.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  timeOutMessage?: NodeJS.Timeout;
  errorMessage?: string;
  optionMessage?: string;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['expired']) {
      clearTimeout(this.timeOutMessage);
      this.optionMessage = "Your Token expired. Please log in again.";
      this.timeOutMessage = setTimeout(() => {
        this.optionMessage = '';
      }, 3000);
    }
  }

  ngOnDestroy() {
    if (this.timeOutMessage) {
      clearTimeout(this.timeOutMessage);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe({
        next: (data: IAuthToken) => {
          this.authService.setCookie(data);
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.log(error);
          if (error.error.status === 401) {
            clearTimeout(this.timeOutMessage);
            this.errorMessage = "Username or Password are wrong. Try again.";
            this.timeOutMessage = setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          } else {
            clearTimeout(this.timeOutMessage);
            this.errorMessage = "Something went wrong. Try again later.";
            this.timeOutMessage = setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        },               
      });
    }
  }
}
