import {Pipe, PipeTransform} from "@angular/core";
import {Advertisement} from "../services/advertisement.service";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(advertisements: Advertisement[], searchStr: string) {
    if (advertisements.length === 0 || searchStr === '') {
      return advertisements;
    }

    return advertisements.filter(advertisement => advertisement.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
  }
}
