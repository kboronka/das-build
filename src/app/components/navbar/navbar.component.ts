import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UsersService } from '../../services/users.service';
import { IBranch } from '../../interfaces/branch.model';
import { BranchesService } from '../../services/branches.service';

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

  branches: IBranch[];

  constructor(
    private userService: UsersService,
    private branchesService: BranchesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchBranches();
  }

  onLogoutClick() {
    this.userService.logout();
    this.snackBar.open('you are logged out', 'OK', {
      duration: 3000
    });

    this.router.navigate(['/']);
    return false;
  }

  fetchBranches() {
    this.branchesService
      .getBranches()
      .subscribe((data: IBranch[]) => {
        this.branches = data;
      });
  }
}
