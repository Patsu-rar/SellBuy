import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {CookiesService} from "../../../services/cookies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form = new FormGroup({
    old_pass: new FormControl('', [Validators.required]),
    new_pass: new FormControl('', [Validators.required]),
    verified_pass: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService, private CookiesService: CookiesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  changePassword() {
    const user = JSON.parse(<string>this.CookiesService.getCookie('user'));
    if (this.form.value.old_pass !== user.password) {
      alert("You've entered the wrong old password.");
      return;
    } else if (this.form.controls['old_pass'].errors || this.form.controls['new_pass'].errors || this.form.controls['new_pass'].errors) {
      alert("Fill in all fields!");
      return;
    } else if (this.form.value.old_pass === this.form.value.new_pass) {
      alert("You can't change password to your present password.");
      return;
    } else if (this.form.value.verified_pass !== this.form.value.new_pass) {
      alert("New password doesn't match the verified one.");
      return;
    }
    this.userService.changeUser(this.form.value.new_pass).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.CookiesService.clearCookie('user');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
