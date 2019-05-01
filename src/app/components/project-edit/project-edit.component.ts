import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../services/project.service';
import { IProject } from '../../interfaces/project.model';
import { IStep } from 'src/app/interfaces/step.interface';
import { isTypeProvider } from '@angular/core/src/di/r3_injector';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: string;
  productForm: FormGroup;
  name: string;
  trunkUrl: string;
  slackWebhook: string;
  steps: [IStep];

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      trunkUrl: ['', Validators.required],
      slackWebhook: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params => {
      this.id = params.id;
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.steps = res.steps;
        this.name = res.name;
        this.trunkUrl = res.trunkUrl;
        this.slackWebhook = res.slackWebhook;

        this.productForm.get('name').setValue(this.name);
        this.productForm.get('trunkUrl').setValue(this.trunkUrl);
        this.productForm.get('slackWebhook').setValue(this.slackWebhook);
      });
    }));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.productForm.markAsDirty();
  }

  editProject(name, trunkUrl, slackWebhook, steps) {
    this.projectService.editProject(this.id, name, trunkUrl, slackWebhook, steps).subscribe(() => {
      this.router.navigate(['/project-list']);
    });
  }

  appendNewStep() {
    this.productForm.markAsDirty();
    const newStep: IStep = {
      description: 'new step',
      command: '',
      arguments: '',
      retryCount: 0
    };

    this.steps.push(newStep);
  }

  onStepValueChange() {
    this.productForm.markAsDirty();
  }

  onStepDeleted() {
    this.productForm.markAsDirty();
  }
}
