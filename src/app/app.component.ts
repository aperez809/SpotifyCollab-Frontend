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

  constructor(
    private modalService: NgbModal,
    private cookieService: CookieService) {}

  selectComponent = component => {
    this.activeComponent = component;
  }

}
