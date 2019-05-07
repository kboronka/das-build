import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../../models/user.model';
import { UsersService, IProfileResponse } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getProfile()
      .subscribe((profile: IProfileResponse) => {
        this.user = profile.user;
      }, err => {
        return false;
      });
  }

}
