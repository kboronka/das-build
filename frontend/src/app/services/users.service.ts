import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface UserAuthInfo {
  name: string,
  username: string,
  email: string,
  admin: boolean
}

interface AuthResponse {
  success: boolean,
  token: string,
  user: UserAuthInfo
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = 'http://localhost:4000';
  authToken: string;
  user: UserAuthInfo;


  constructor(private http: HttpClient) { }

  registerUser(name: string, username: string, email: string, password: string) {
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      admin: false
    }

    return this.http.post(`${this.uri}/users/register`, user);
  }

  authenticateUser(username: string, password: string, callback) {
    const user = {
      username: username,
      password: password
    }

    this.http.post(`${this.uri}/users/authenticate`, user)
      .subscribe((data: AuthResponse) => {
        if (data.success) {
          callback(null, data.user, data.token);
        } else {
          callback('username or password is incorrect', null, null);
        }
      });
  }

  storeUserData(user: UserAuthInfo, token: string) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  };

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let header = new HttpHeaders()
      .append('Authorization', this.getToken());

    return this.http.get(`${this.uri}/users/profile`, { headers: header });
  }

  getToken(): string {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return token;
  }
}
