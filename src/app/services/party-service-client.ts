import { Injectable } from '@angular/core';

@Injectable()
export class PartyService {


  constructor() {  }


  async findPartyById(partyId: String) {
    let foundParty = await fetch("http://song-request-server-node.herokuapp.com/api/parties/" + partyId)
    return await foundParty.json();
  }

  async removeAttendee(pid, uid) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/removeUser/" + pid, {
      method: 'PUT',
      body: JSON.stringify({
        userId: uid
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resData => resData);
  }

  addAttendee(pid, uid) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/addUser/" + pid, {
      method: 'PUT',
      body: JSON.stringify({
        userId: uid
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
  }


  getSession() {
    return fetch("http://song-request-server-node.herokuapp.com/api/session/get", {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(user => user.json());

  }


}
