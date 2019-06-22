import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from '../services/party-service-client'
import { UserService } from '../services/user-service-client';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  private party: String;
  private partyId: String;

  constructor(private activatedRoute: ActivatedRoute,
              private partyService: PartyService,
              private userService: UserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.partyId = params['partyId'];
        this.partyService.findPartyById(this.partyId)
          .then(res => {
            console.log(res);
            return this.party = res;
          });
      });
  }

  

  joinParty(partyId) {
    const currUser = this.cookieService.getAll();
    if (currUser["currentPartyId"] != "undefined" || currUser["currentPartyId"] != undefined) {
      this.partyService.removeAttendee(partyId, currUser["_id"])
    }

    this.userService.updateUser(currUser["_id"], partyId);
    this.cookieService.set("currentPartyId", partyId, undefined, "/");

    this.partyService.addAttendee(partyId, currUser["_id"]);


    
    /*this.userService.getCurrentUserId()
      .then(userId => {
        this.partyService.removeAttendee(partyId, userId);
        this.userService.updateUser(userId, partyId);
        this.partyService.addAttendee(partyId, userId);
      });*/
    }
  
  

    /*const userId = this.userService.getCurrentUserId()
      .then(res => res)
    this.partyService.removeAttendee(partyId, userId);
    this.userService.updateUser(userId, partyId);
    this.partyService.addAttendee(partyId, userId);*/
}
