import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Injectable()
export class UserService { 
    private requestBaseUrl: string;
    private sessionBaseUrl: string;
    

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
        });
      
        
    
      //return this.assignSessionToUser(fulfilledPromise);

      }
          
      assignSessionToUser(un: String, pw: String) { 
        return this.findUserByCredentials(un, pw).then(user => {
          if (user) {
            const assignedSessionId = user["_id"];
            const requestSessionUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value".replace(":name", "sessionId").replace(":value", assignedSessionId);
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
          else {
            console.log("cunt");
            return;
          }

          
      })
       }     
}