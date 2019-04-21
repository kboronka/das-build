import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UsersService, UserAuthInfo } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.userService.logout();
    this.snackBar.open('you are logged out', 'OK', {
      duration: 3000
    });

    this.router.navigate(['/']);
    return false;
  }

}
