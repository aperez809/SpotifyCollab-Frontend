import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Injectable()
export class UserService {

    private requestBaseUrl: string;
    private sessionBaseUrl: string;
    currentUserData;
    

    constructor() {
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
      })
    }

    logUserOut() {
      return fetch("https://song-request-server-node.herokuapp.com/api/session/reset", {
        credentials: 'include',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    }
}