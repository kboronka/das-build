import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../../models/user.model';
import { UsersService, IProfileResponse } from '../../services/users.service';
import { IPullRequest } from '../../interfaces/pull-request.model';
import { PullRequestsService } from '../../services/pull-requests.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  branches: IPullRequest[];
  user: User;

  constructor(
    private userService: UsersService,
    private pullRequestService: PullRequestsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchPullRequests();
    this.fetchUser();
  }

  fetchPullRequests() {
    this.pullRequestService
      .getPullRequests()
      .subscribe((data: IPullRequest[]) => {
        this.branches = data;
      });
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
