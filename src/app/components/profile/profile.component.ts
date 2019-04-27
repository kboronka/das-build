import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, UserAuthInfo } from '../../services/users.service';
import { User } from '../../../../models/user.model';

interface ProfileResponse {
  user: User;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe((profile: ProfileResponse) => {
        this.user = profile.user;
      }, err => {
        console.log(err);
        return false;
      });
  }

}
