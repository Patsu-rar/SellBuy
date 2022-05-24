import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from "../../services/advertisement.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  ads: any[] = [];
  images: any[] = [];
  searchAd: string = '';

  constructor(private adService: AdvertisementService) {
  }

  ngOnInit(): void {
    const basedAds = this.adService.get_all_ads()

    basedAds.subscribe({
      next: res => {
        console.log(res);
        for (let el of res) {
          this.ads.push(el);
          const basedImages = this.adService.get_first_image(el.id);
          basedImages.subscribe({
            next: response => {
              this.images.push(response);
            },
            error: err => {
              console.log(err);
            }
          });

        }
      },
      error: err => {
        console.log(err);
      }
    });
    console.log(this.ads, this.images)
  }
}
