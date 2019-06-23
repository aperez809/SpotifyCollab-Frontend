import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {PartyService} from "../services/party-service-client";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
  availableParties = [];
  partyName = '';

  constructor(private cookieService: CookieService,
              private partyService: PartyService) { }
  ngOnInit() {
    this.partyService.getPartyList()
      .then(res => {
        this.availableParties = res;
      });

  }

  createParty() {
    this.partyService.createParty(this.partyName, this.cookieService.get("_id"))
      .then(res => this.ngOnInit());

  }

}
