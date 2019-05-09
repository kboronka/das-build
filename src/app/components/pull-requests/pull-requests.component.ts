import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../../models/user.model';
import { UsersService, IProfileResponse } from '../../services/users.service';
import { IPullRequest } from '../../interfaces/pull-request.model';
import { PullRequestsService } from '../../services/pull-requests.service';


@Component({
  selector: 'app-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {

  all: IPullRequest[];
  requireAppoval: IPullRequest[];
  reqdyToQueue: IPullRequest[];
  inQueue: IPullRequest[];
  passed: IPullRequest[];
  failed: IPullRequest[];

  user: User;

  constructor(
    private userService: UsersService,
    private pullRequestService: PullRequestsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  getTabCount(list: IPullRequest[]) {
    if (!list || list.length <= 0) return '';

    return '(' + list.length.toString() + ')';
  }

  fetchPullRequests(project: String) {
    this.pullRequestService
      .getPullRequestsByProject(project)
      .subscribe((data: IPullRequest[]) => {
        this.all = data;
        this.requireAppoval = data.filter(pr => pr.state == 'Open');
        this.reqdyToQueue = data.filter(pr => pr.state == 'Approved');
        this.inQueue = data.filter(pr => pr.state == 'Queued');
        this.passed = data.filter(pr => pr.state == 'Completed');
        this.failed = data.filter(pr => pr.state == 'Failed');
      });
  }

  fetchUser() {
    this.userService.getProfile()
      .subscribe((profile: IProfileResponse) => {
        this.user = profile.user;
        this.fetchPullRequests(this.user.username);
      }, err => {
        return false;
      });
  }
}
