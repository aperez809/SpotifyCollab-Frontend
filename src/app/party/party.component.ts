import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from '../services/party-service-client'
import { UserService } from '../services/user-service-client';


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
              private userService: UserService) { }

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
    this.userService.getCurrentUserId()
      .then(userId => {
        this.partyService.removeAttendee(partyId, userId);
        this.userService.updateUser(userId, partyId);
        this.partyService.addAttendee(partyId, userId);
      });
    }
  
  

    /*const userId = this.userService.getCurrentUserId()
      .then(res => res)
    this.partyService.removeAttendee(partyId, userId);
    this.userService.updateUser(userId, partyId);
    this.partyService.addAttendee(partyId, userId);*/
}
