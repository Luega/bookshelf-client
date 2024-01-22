import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuthToken } from 'src/app/models/auth/authToken.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe({
        next: (data: IAuthToken) => {
          this.authService.setToken(data);
          this.router.navigate(['/books']);
        },
        error: (error) => console.log(error),               
      });
    }
  }
}
