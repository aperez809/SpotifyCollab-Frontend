import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Song Request';
  activeComponent = 'profile';
  navbarOpen = false;

  constructor(
    private modalService: NgbModal,
    private cookieService: CookieService) {}

  selectComponent = component => {
    this.activeComponent = component;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  loggedIn() {
    return this.cookieService.check('_id');
  }

  inParty() {
    return this.cookieService.get('currentPartyId') !== 'null';
  }

  currentUsername() {
    return this.cookieService.get("username")
  }

  currentPartyName() {
    return this.cookieService.get("currentPartyName");
  }

  currentPartyId() {
    return this.cookieService.get("currentPartyId");
  }

}
