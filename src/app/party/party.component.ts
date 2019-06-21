import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from '../services/party-service-client'


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  party;
  partyId;

  constructor(private activatedRoute: ActivatedRoute,
              private partyService: PartyService) { }

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


}
