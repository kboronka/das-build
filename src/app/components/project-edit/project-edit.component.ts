import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../services/project.service';
import { IProject } from '../../interfaces/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: string;
  project: any = {};
  editForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      trunkUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params => {
      this.id = params.id;
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.project = res;

        this.editForm.get('name').setValue(this.project.name);
        this.editForm.get('trunkUrl').setValue(this.project.trunkUrl);
      });
    }));
  }

  editProject(name, trunkUrl) {
    this.projectService.editProject(this.id, name, trunkUrl).subscribe(() => {
      this.router.navigate(['/project-list']);
    });
  }

}
