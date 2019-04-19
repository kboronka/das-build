import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';

import { UsersService } from '../../services/users.service';

interface UserPostResponse {
  success: boolean,
  msg: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  matcher: MyErrorStateMatcher;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.matcher = new MyErrorStateMatcher();

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
    return { notSame: true };
  }

  registerUser(name, username, email, password, confirmPassword) {
    this.userService.registerUser(name, username, email, password).subscribe((data: UserPostResponse) => {
      if (data.success) {
        this.router.navigate(['/login']);
        this.snackBar.open(`${name} is now registered.`, 'OK', {
          duration: 3000
        });
      } else {
        this.snackBar.open(data.msg, 'OK', {
          duration: 3000
        });
      }

    });
  }

  ngOnInit() {
    document.body.className = "";
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
