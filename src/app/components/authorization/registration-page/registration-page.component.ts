import {Component, OnInit} from '@angular/core';
import {RegionsService} from "../../../services/regions.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  regions: any[] = [];

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    valid_password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    region_id: new FormControl('Виберіть свій регіон...', Validators.required)
  })


  constructor(private regionsService: RegionsService, private formBuilder: FormBuilder,
              private authService: AuthorizationService, private router: Router) {
  }

  ngOnInit(): void {
    const basedRegions = this.regionsService.getRegions();
    basedRegions.subscribe((response) => {
      console.log(response);
      for (let el of response) {
        this.regions.push(el.name)
      }
    });

  }

  verifyEmail() {
    if (this.form.controls['email'].errors) {
      return 'invalid';
    }
    return '';
  }

  verifyUsername() {
    if (this.form.controls['username'].errors) {
      return 'invalid';
    }
    return '';
  }

  verifyFirstName() {
    if (this.form.controls['first_name'].errors) {
      return 'invalid';
    }
    return '';
  }

  verifyLastName() {
    if (this.form.controls['last_name'].errors) {
      return 'invalid';
    }
    return '';
  }

  verifyPassword() {
    if (this.form.controls['password'].errors || (this.form.value.password !== this.form.value.valid_password)) {
      return 'invalid';
    }
    return '';
  }

  verifyValidPassword() {
    if (this.form.controls['valid_password'].errors || (this.form.value.password !== this.form.value.valid_password)) {
      return 'invalid';
    }
    return '';
  }

  verifyRegion() {
    if (this.form.controls['region_id'].errors || this.form.value.region_name === 'Choose your region...') {
      return 'invalid';
    }
    return '';
  }

  register() {
    const reg_data = this.form.value;
    reg_data.region_id = this.regions.findIndex(el => el === reg_data.region_id) + 1;

    if (this.form.status === 'VALID') {
      this.authService.registration(reg_data).subscribe({
        next: (response) => {
          this.router.navigate(['/login'])
        },
        error: err => {
          if (err.status === 400) {
            alert("User with such email or username already exists")
          }
        }
      });
    }
  }
}
