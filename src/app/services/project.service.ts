import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../interfaces/project.model';
import { IStep } from 'src/app/interfaces/step.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects() {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get<[IProject]>(`projects`, { headers: header });
  }

  getProjectById(id) {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get<IProject>(`projects/${id}`, { headers: header });
  }

  addProject(name, trunkUrl) {
    const project = {
      name,
      trunkUrl
    };

    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.post(`projects/add`, project, { headers: header });
  }

  editProject(id, name, trunkUrl, slackWebhook, steps: [IStep]) {
    const project = {
      name,
      trunkUrl,
      slackWebhook,
      steps
    };

    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.post(`projects/update/${id}`, project, { headers: header });
  }

  deleteProject(id) {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get(`projects/delete/${id}`, { headers: header });
  }
}
