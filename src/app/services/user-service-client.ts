import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {

    private requestBaseUrl: string;
    private sessionBaseUrl: string;
    currentUserData;


    constructor(private cookieService: CookieService) {
      this.requestBaseUrl = "https://song-request-server-node.herokuapp.com/api/users/login";
      this.sessionBaseUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value";
    }

    findUserByCredentials(un: String, pw: String) {
      return fetch("https://song-request-server-node.herokuapp.com/api/users/login", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          username: un,
          password: pw
        }),
        headers: {
            'content-type': 'application/json'
        }
      })
        .then(user => {
          return user.json();
        })
        .then(userData => {
          console.log(userData);
          return userData
        });

      //return this.assignSessionToUser(fulfilledPromise);

      }

      async findUserById(id: String) {
        return await fetch("https://song-request-server-node.herokuapp.com/api/users/" + id, {
          method: 'GET',
          headers: {
              'content-type': 'application/json'
          }
        })
          .then(user => {
            return user.json();
          })
          .then(userData => {
            console.log(userData);
            return userData
          });
      }

      assignSessionToUser(user) {

        this.cookieService.set("_id", user["_id"], undefined, "/");
        this.cookieService.set("username", user["username"], undefined, "/")
        this.cookieService.set("firstName", user["firstName"], undefined, "/")
        this.cookieService.set("lastName", user["lastName"], undefined, "/")
        this.cookieService.set("currentPartyId", user["currentPartyId"], undefined, "/");

        const assignedSessionId = user["_id"];
        const requestSessionUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value".replace(":name", user["username"]).replace(":value", assignedSessionId);
        return fetch(requestSessionUrl, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => {
          //console.log(res.json())
          return res.json();
        })
        .then(resData => {
          return resData;
        });
    }

    createUser(username: String, password: String, firstName: String, lastName: String) {
      const createUrl = "https://song-request-server-node.herokuapp.com/api/users";
      return fetch(createUrl, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dob: null,
          profilePicturePath: "assets/images/vinyl-background.png"
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
            return res;
          })
        .then(resData => {
          return resData;
          });
      }

    getSession() {
      return fetch("https://song-request-server-node.herokuapp.com/api/session/get", {
        credentials: 'include',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => response.json());
    }

    getCurrentUserId() {
      return this.getSession().then(sesh => {
        const seshKey = Object.keys(sesh).filter(k => k != "cookie")[0];
        return sesh[seshKey];
      });
    }

    editUserProfile(userId, firstName, lastName, password) {
      const editProfileUrl = "https://song-request-server-node.herokuapp.com/api/users/:userId".replace(":userId", userId);
      return fetch(editProfileUrl, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {return response.json()})
    }

    deleteUserProfile (userId) {
      const deleteProfileUrl = "https://song-request-server-node.herokuapp.com/api/users/:userId".replace(":userId", userId);
      return fetch(deleteProfileUrl, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {return response.json()})
    }


    logUserOut() {
      this.cookieService.deleteAll("/");
    }

    removeSpotifyInformation(userId) {
      const removeSpotifyUrl = "https://song-request-server-node.herokuapp.com/api/users/:userId".replace(":userId", userId);
      return fetch(removeSpotifyUrl, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          "spotifyUser": false,
          "spotifyUsername": null,
          "spotifyUrl": null,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {return response.json()})
    }

    addSpotifyInformation(userId, spotifyUsername, spotifyUrl) {
      const addSpotifyUrl = "https://song-request-server-node.herokuapp.com/api/users/:userId".replace(":userId", userId);
      return fetch(addSpotifyUrl, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          "spotifyUser": true,
          "spotifyUsername": spotifyUsername,
          "spotifyUrl": spotifyUrl,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {return response.json()})
    }

    updateUserParty(userId, partyId) {
      const putUrl = "https://song-request-server-node.herokuapp.com/api/users/" + userId;
      return fetch(putUrl, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          currentPartyId: partyId
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => console.log(res.json()));
    }

    updateUserType(uid, userType) {
      const putUrl = "https://song-request-server-node.herokuapp.com/api/users/" + uid;
      return fetch(putUrl, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          userType: userType
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => console.log(res.json()));
    }

    addRecentTrack(userId, spotifyId, trackName, artistName) {
      const putUrl = "https://song-request-server-node.herokuapp.com/api/users/" + userId;
      let addedTrack = {
        "spotifyId": spotifyId,
        "trackName": trackName,
        "artistName": artistName
      }
      let trackList = [];
      return this.findUserById(userId)
        .then(response => {
          trackList = response.recentTracks;
          trackList.push(addedTrack);
          return fetch(putUrl, {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify({
              recentTracks: trackList
            }),
            headers: {
              'content-type': 'application/json'
            }
          }).then(status => {return status})
        });
    }
}
