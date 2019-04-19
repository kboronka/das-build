import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, UserAuthInfo } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    document.body.className = "";
    this.userService.getProfile()
      .subscribe(profile => {
        this.user = profile.user;
      }, err => {
        console.log(err);
        return false;
      });
  }

}