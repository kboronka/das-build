import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UsersService, UserAuthInfo } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  onLoginButtonClick(username, password) {
    this.userService.authenticateUser(username, password,
      (err: string, user: UserAuthInfo, token: string) => {
        if (err) {
          this.snackBar.open(err, 'OK', {
            duration: 3000
          });
        } else {
          this.router.navigate(['/dashboard']);
          this.userService.login(user, token);
          this.snackBar.open(`${user.name} is now logged in.`, 'OK', {
            duration: 3000
          });
        }
      });
  }

}
