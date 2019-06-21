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
    }).then(res => {
      return res.json();
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
