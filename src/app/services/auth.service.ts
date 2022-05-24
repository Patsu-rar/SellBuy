import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookiesService} from "./cookies.service";

const token = btoa('username:password');

const httpOptions = {'Authorization': 'Basic ' + btoa('username:password')};

export interface User {
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string,
  region_id: number,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient, private CookiesService: CookiesService) {
  }

  login(loginData: { username: string, password: string }) {
    return this.http.post<{ username: string, password: string }>('http://127.0.0.1:5000/api/v1/auth/login', loginData);
  }

  registration(regData: {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    region_id: number
  }) {
    return this.http.post('http://127.0.0.1:5000/api/v1/auth/register', regData);
  }
}
