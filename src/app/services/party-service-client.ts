import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PartyService {


  constructor(private cookieService: CookieService) {  }


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
      body: {
        spotifyId: trackId,
        trackName: trackName,
        artistName: artistName
      }
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
    return fetch("http://song-request-server-node.herokuapp.com/api/parties" + pid + "/setDJ/" + userId, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    });
  }



}
