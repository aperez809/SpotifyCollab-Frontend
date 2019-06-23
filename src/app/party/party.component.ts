import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../services/party-service-client'
import { UserService } from '../services/user-service-client';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  party = {
    partyName: '',
    attendees: [],
    passwordReq: false,
    password: '',
    bannedUsers: [],
    partyLeader: {
      username: ''
    },
    queue: []
  };
  partyId = '';

  constructor(private activatedRoute: ActivatedRoute,
              private partyService: PartyService,
              private userService: UserService,
              private cookieService: CookieService,
              private router: Router) { }

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



  async joinParty(partyId) {
    const currUser = this.cookieService.getAll();
    if (currUser["currentPartyId"] != "undefined" || currUser["currentPartyId"] != undefined) {
      this.partyService.removeAttendee(partyId, currUser["_id"]).catch();
    }
    await this.userService.updateUserParty(currUser["_id"], partyId);
    await this.cookieService.set("currentPartyId", partyId, undefined, "/");
    await this.cookieService.set("currentPartyName", this.party.partyName, undefined, "/");
    await this.partyService.addAttendee(partyId, currUser["_id"]);
    await this.ngOnInit();
  }

  async leaveParty() {
    const currPartyId = this.cookieService.get('currentPartyId');
    const currUsername = this.cookieService.get('username');
    const currUserId = this.cookieService.get("_id");
    if (this.party.partyLeader.username === currUsername) {
      await this.router.navigate(['']);
      await this.partyService.deleteParty(currPartyId);
      await this.userService.updateUserParty(currUserId, null)
      await this.userService.updateUserType(currUserId, 'LISTENER')
      this.cookieService.set("currentPartyId", null, undefined, "/");
    } else {
      console.log("Step 2")
      await this.partyService.removeAttendee(currPartyId, currUserId);
      await this.userService.updateUserParty(currUserId, null);
      await this.cookieService.set("currentPartyId", null, undefined, "/");
      await this.cookieService.set("currentPartyName", null, undefined, "/");
    }
  }

  async deleteParty() {
    /*
    if(this.party.attendees.length > 0) {
      for (let user in this.party.attendees) {
        await this.userService.updateUserParty(user["_id"], null)
      }
    }
    */
    await this.partyService.deleteParty(this.partyId);
    await this.router.navigate(['']);
  }

  removeFromQueue(id) {
    this.partyService.removeSongFromQueue(this.partyId, id)
      .then(res => {
        this.router.navigate(['/party', this.partyId])
        this.ngOnInit();
      })
  }

  myParty() {
    return this.cookieService.get("username") == this.party.partyLeader.username;
  }

  loggedIn() {
    return this.cookieService.check("_id");
  }

  inParty() {
    return this.cookieService.get("currentPartyId") == this.partyId;
  }

  isAdmin() {
    return this.cookieService.get("userType") == "ADMIN";
  }



    /*const userId = this.userService.getCurrentUserId()
      .then(res => res)
    this.partyService.removeAttendee(partyId, userId);
    this.userService.updateUserParty(userId, partyId);
    this.partyService.addAttendee(partyId, userId);*/
}
