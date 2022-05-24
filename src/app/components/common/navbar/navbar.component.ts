import {Component} from '@angular/core';
import {CookiesService} from "../../../services/cookies.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private CookiesService: CookiesService, private router: Router) {
  }

  isLogged() {
    return !(this.CookiesService.getCookie('user') === null);
  }

  logout(){
    if (this.router.url === '/profile') {
      this.router.navigate(['/login']);
    } else if (this.router.url === '/create-add') {
      this.router.navigate(['/login']);
    }
    this.CookiesService.clearCookie('user');
  }
}
