import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService{

  constructor(private http: HttpClient) {
  }

  uploadImage(values: any): Observable<any> {
    return this.http.post(
      'https://api.cloudinary.com/v1_1/sellbuycloud/image/upload',
      values
    );
  }

  // getImages() {
  //   return this.http.get('https://api.cloudinary.com/v1_1/sellbuycloud/image/upload');
  // }
}


