import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAuthToken } from 'src/app/models/auth/authToken.interface';
import { MessageService } from 'src/app/services/message/message.service';
import { MessageType } from 'src/app/models/message/message-type.enum';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public messageService: MessageService,
    public darkMode: DarkModeService
    ) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['expired'] === "true") {
      this.messageService.setMessageTimeOut(
        {
          text: "Your Token expired. Please log in again.",
          type: MessageType.option,
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.messageService.timeOutMessage) {
      clearTimeout(this.messageService.timeOutMessage);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).subscribe({
        next: (data: IAuthToken) => {
          this.loginForm.reset();
          this.authService.setCookie(data);
          this.router.navigate(['/books']);
        },
        error: (error) => {
          this.loginForm.reset();
          if (error.error.status === 401) {
            this.messageService.setMessageTimeOut(
              {
                text: "Username or Password are wrong. Try again.",
                type: MessageType.error,
              }
            );
          } else {
            this.messageService.setMessageTimeOut(
              {
                text: "Something went wrong. Try again later.",
                type: MessageType.error,
              }
            );
          }
        },               
      });
    }
  }
}
