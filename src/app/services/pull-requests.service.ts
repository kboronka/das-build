import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPullRequest } from '../interfaces/pull-request.model';

@Injectable({
  providedIn: 'root'
})
export class PullRequestsService {

  constructor(private http: HttpClient) { }

  getPullRequests() {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get<[IPullRequest]>('pr', { headers: header });
  }

  getPullRequestsByAuthor(author: String) {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get<[IPullRequest]>(
      `pr/author/${author}`,
      { headers: header });
  }
}

