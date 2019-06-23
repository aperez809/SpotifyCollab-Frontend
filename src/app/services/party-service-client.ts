import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {UrlSerializer} from "@angular/router";
import {UserService} from "./user-service-client";

@Injectable()
export class PartyService {


  constructor(private cookieService: CookieService,
              private userService: UserService) {  }



  getPartyList() {
    return fetch(    "http://song-request-server-node.herokuapp.com/api/parties", {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  }

  createParty = async(partyName, ownerId) => {
    const owner = await this.userService.findUserById(ownerId);
    return fetch("http://song-request-server-node.herokuapp.com/api/parties", {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        "partyName": partyName,
        "attendees": [owner],
        partyLeader: owner,
        queue: [],
        "passwordReq": false,
        "password": null,
        bannedUsers: [],
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.cookieService.set("currentPartyId", res["_id"], undefined, "/");
        return this.userService.updateUserParty(ownerId, res["_id"])})
      .then(res => {
        return this.userService.updateUserType(ownerId, 'DJ');
    }).then(res => {
        return this.setDJ(this.cookieService.get("currentPartyId"), ownerId);
    });
  }


  async findPartyById(partyId: String) {
    let foundParty = await fetch("http://song-request-server-node.herokuapp.com/api/parties/" + partyId)
    return await foundParty.json();
  }

  async removeAttendee(pid, uid) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/removeUser/" + pid + "/removeUser/" + uid, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resData => resData);
  }

  addAttendee(pid, uid) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/" + pid + "/addUser/" + uid, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  addSongToQueue = (pid, trackId, trackName, artistName) => {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/" + pid + "/addSong", {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        "spotifyId": trackId,
        "trackName": trackName,
        "artistName": artistName
      })
    });
  }

  removeSongFromQueue = (pid, spotifyId) => {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/" + pid + "/removeSong/" + spotifyId, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
    });
  }

  setDJ = (pid, userId) => {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/" + pid + "/setDJ/" + userId, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    });
  }



}
