import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "./cookies.service";


export interface User {
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string,
  region: {
    id: number,
    name: string
  },
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = JSON.parse(<string>this.CookiesService.getCookie('user'));
  constructor(private http: HttpClient, private CookiesService: CookiesService) {
  }

  getAllUsers() {
    return this.http.get<User[]>('http://127.0.0.1:5000/api/v1/users');
  }

  getUserByUsername(username: string | null) {
    return this.http.get<User>('http://127.0.0.1:5000/api/v1/user/' + username);
  }

  changeUser(password: string) {
    console.log(password)
    return this.http.put('http://127.0.0.1:5000/api/v1/user/change_user', {password: password}, {
      headers: {'Authorization': 'Basic ' + btoa(this.user.username + ':' + this.user.password)}
    });
  }
}
