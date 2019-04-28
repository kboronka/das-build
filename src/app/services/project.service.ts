import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects() {
    let header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get(`projects`, { headers: header });
  }

  getProjectById(id) {
    let header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get(`projects/${id}`, { headers: header });
  }

  addProject(name, trunkUrl) {
    const project = {
      name,
      trunkUrl
    }

    let header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.post(`projects/add`, project, { headers: header });
  }

  editProject(id, name, trunkUrl) {
    const project = {
      name,
      trunkUrl
    };

    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.post(`projects/update/${id}`, project, { headers: header });
  }

  deleteProject(id) {
    let header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get(`projects/delete/${id}`, { headers: header });
  }
}
