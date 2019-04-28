import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProject } from '../../interfaces/project.model';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: IProject[];
  displayedColumns = ['name', 'trunkUrl', 'actions'];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService
      .getProjects()
      .subscribe((data: IProject[]) => {
        this.projects = data;
      });
  }

  editProject(id) {
    this.router.navigate([`/project-edit/${id}`]);
  }

  deleteProject(id) {
    this.projectService
      .deleteProject(id)
      .subscribe(() => {
        this.fetchProjects();
      });
  }
}
