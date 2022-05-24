import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "./cookies.service";


export interface Advertisement {
  name: string,
  description: string,
  status: string,
  date_of_publishing: Date;
  user_id: number,
  region_id: number,
  category_id: number,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  user = JSON.parse(<string>this.CookiesService.getCookie('user'));

  constructor(private http: HttpClient, private CookiesService: CookiesService) {
  }

  createAd(data: {
    name: string,
    description: string,
    status: string,
    user_id: number,
    region_id: number,
    category_id: number
  }) {
    return this.http.post<Advertisement>('http://127.0.0.1:5000/api/v1/advertisement', data, {
      headers: {'Authorization': 'Basic ' + btoa(this.user.username + ':' + this.user.password)}
    });
  }

  postImages(imageUrl: string){
    return this.http.post<Advertisement>('http://127.0.0.1:5000/api/v1/images', {url: imageUrl});
  }

  connectImages(image_id: number, advertisement_id: number){
    return this.http.post<Advertisement>('http://127.0.0.1:5000/api/v1/ad_images', {
      image_id: image_id,
      advertisement_id: advertisement_id
    });
  }

  get_all_ads(){
    return this.http.get<Advertisement[]>('http://127.0.0.1:5000/api/v1/advertisements');
  }

  get_first_image(ad_id: number) {
    return this.http.get(`http://127.0.0.1:5000/api/v1/first-image/${ad_id}`);
  }
}
