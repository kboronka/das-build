import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranch } from '../interfaces/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  getBranches() {
    const header = new HttpHeaders()
      .append('Authorization', localStorage.getItem('id_token'));

    return this.http.get<[IBranch]>(`branches`, { headers: header });
  }
}

