import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  registerUser(name, username, email, password) {
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      admin: false
    }

    return this.http.post(`${this.uri}/users/register`, user);
  }
}
