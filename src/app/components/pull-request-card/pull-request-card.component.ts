import { Component, Input, OnInit } from '@angular/core';
import { IPullRequest } from 'src/app/interfaces/pull-request.model';

@Component({
  selector: 'app-pull-request-card',
  templateUrl: './pull-request-card.component.html',
  styleUrls: ['./pull-request-card.component.css']
})
export class PullRequestCardComponent implements OnInit {
  @Input() pullRequest: IPullRequest;

  constructor() { }

  ngOnInit() {
  }

}
