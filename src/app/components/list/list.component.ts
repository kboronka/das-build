import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IIssue } from '../../interfaces/issue.model';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: IIssue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: IIssue[]) => {
        this.issues = data;
      });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService
      .deleteIssue(id)
      .subscribe(() => {
        this.fetchIssues();
      });
  }
}
