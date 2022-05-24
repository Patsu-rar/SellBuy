import {Component, OnInit} from '@angular/core';
import {UploadService} from "../../../services/upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvertisementService} from "../../../services/advertisement.service";
import {UserService} from "../../../services/user.service";
import {CookiesService} from "../../../services/cookies.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-add-page',
  templateUrl: './create-add-page.component.html',
  styleUrls: ['./create-add-page.component.css']
})
export class CreateAddPageComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  freeSpace: number = 8;
  storedSpace: number = 0;
  clickedIndex!: number;
  imageUrls = [];
  imagePath: any;
  index!: number;
  file_data: File[] = [];


  constructor(private adService: AdvertisementService, private userService: UserService,
              private CookiesService: CookiesService, private uploadService: UploadService,
              private router: Router) {
  }

  ngOnInit(): void {}

  changeState: boolean = false;

  preview(files: any) {
    if (files.length === 0)
      return;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      // @ts-ignore
      this.imageUrls.push(reader.result);
    }
  }

  addFile(event: any) {
    this.file_data.push(event.target.files[0]);
  }

  removeFile() {
    this.file_data.splice(this.clickedIndex, 1);
    this.imageUrls.splice(this.clickedIndex, 1);
    this.freeSpace += 1;
  }

  onEnter() {
    return 'ad-wrapper'
  }

  onLeave() {
    return ''
  }

  verifyName() {
    if (this.form.controls['name'].errors) {
      return 'invalid';
    }
    return '';
  }

  verifyDescription() {
    if (this.form.controls['description'].errors) {
      return 'invalid';
    }
    return '';
  }

  onSubmit() {
    let ad_data;
    const loggedUser = JSON.parse(<string>this.CookiesService.getCookie('user'));

    this.userService.getUserByUsername(loggedUser.username)
      .subscribe({
        next: res => {
          let user = res;
          ad_data = {
            'name': this.form.value.name,
            'description': this.form.value.description,
            'status': 'open',
            'region_id': user.region.id,
            'category_id': 1,
            'user_id': user.id
          }

          this.adService.createAd(ad_data).subscribe({
            next: res => {
              const ad_id = res.id;
              for (let image of this.file_data){
                const data = new FormData();
                data.append('file', image);
                data.append('upload_preset', 'angular_cloudinary');
                data.append('cloud_name', 'sellbuycloud');
                this.uploadService.uploadImage(data).subscribe(
                  res => {
                    this.adService.postImages(res.secure_url).subscribe({
                      next: response => {
                        this.adService.connectImages(response.id, ad_id).subscribe({
                          next: value => {
                            console.log(value);
                            this.router.navigate(['/']);
                          },
                          error: err => {
                            console.log(err);
                          }
                        })
                      },
                      error: err => {
                        console.log(err);
                      }
                    });
                  }
                );
              }
            },
            error: err => {
              console.log(err);
            }
          })
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
