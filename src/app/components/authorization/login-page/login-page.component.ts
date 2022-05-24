import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {CookiesService} from "../../../services/cookies.service";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthorizationService, private router: Router,
              private CookiesService: CookiesService) {
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.value.username == undefined || this.form.value.password == undefined) {
      alert("Please, fill all fields!")
    } else if (this.form.value.username == '' || this.form.value.password == '') {
      alert("Please, fill all fields!")
    } else {
      this.authService
        .login({username: this.form.value.username, password: this.form.value.password})
        .subscribe({
          next: (response) => {
            this.CookiesService.setCookie('user', JSON.stringify({
              username: response.username,
              password: this.form.value.password
            }), 15);
            this.router.navigate(['/']);
          },
          error: err => {
            if (err.status === 404) {
              alert("Incorrect username or password")
            }
          }
        })
    }
  }
}
