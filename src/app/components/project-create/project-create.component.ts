import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      trunkUrl: ['', Validators.required]
    });
  }

  addProject(name, trunkUrl) {
    this.projectService.addProject(name, trunkUrl).subscribe(() => {
      this.router.navigate(['/project-list']);
    });
  }

  ngOnInit() { }

}
