import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../../models/user.model';
import { UsersService, IProfileResponse } from '../../services/users.service';
import { IProject } from 'src/app/interfaces/project.model';
import { ProjectService } from 'src/app/services/project.service';

export interface Branch {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  projects: IProject[];
  user: User;

  constructor(
    private userService: UsersService,
    private projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchProjects();
    this.fetchUser();
  }

  onLogoutClick() {
    this.userService.logout();
    this.snackBar.open('you are logged out', 'OK', {
      duration: 3000
    });

    this.router.navigate(['/']);
    return false;
  }

  fetchProjects() {
    this.projectService
      .getProjects()
      .subscribe((data: IProject[]) => {
        this.projects = data;
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
