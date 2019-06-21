import { Injectable } from '@angular/core';

@Injectable()
export class PartyService {


  constructor() {  }


  async findPartyById(partyId: string) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/" + partyId, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  removeAttendee(pid, uid) {
    return fetch("http://song-request-server-node.herokuapp.com/api/parties/removeUser/" + pid, {
      method: 'PUT',
      body: JSON.stringify({
        userId: uid
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
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
