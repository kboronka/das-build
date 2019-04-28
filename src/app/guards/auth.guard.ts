import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService, UserAuthInfo } from '../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  canActivate() {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
