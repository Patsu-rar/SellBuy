import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Region {
  id: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private http: HttpClient) {
  }

  getRegions() {
    return this.http.get<Region[]>('http://127.0.0.1:5000/api/v1/regions')
  }
}
