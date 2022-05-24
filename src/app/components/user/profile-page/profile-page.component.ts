import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {CookiesService} from "../../../services/cookies.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  constructor(private userService: UserService, private CookiesService: CookiesService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: new FormControl({value: '', disabled: true}),
      username: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(<string>this.CookiesService.getCookie('user'));

    this.userService.getUserByUsername(user.username).subscribe({
      next: (response) => {
        const data = response;
        this.form = new FormGroup({
          email: new FormControl({value: data.email, disabled: true}),
          username: new FormControl({value: data.username, disabled: true})
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
