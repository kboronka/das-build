import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../services/project.service';
import { IProject } from '../../interfaces/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: string;
  name: string;
  trunkUrl: string;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params => {
      this.id = params.id;
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.name = res.name;
        this.trunkUrl = res.trunkUrl;
      });
    }));
  }

}
