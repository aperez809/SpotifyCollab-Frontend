import { Injectable } from '@angular/core';

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
          
      assignSessionToUser(un, pw) { 
        this.findUserByCredentials(un, pw). then(user => {
        console.log(user);
        if (user) {
        const assignedSessionId = user["_id"];
        const requestSessionUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value".replace(":name", "sessionId").replace(":value", assignedSessionId)
        console.log(requestSessionUrl);
        return fetch(requestSessionUrl, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => {
          try {
            return res.json()
          }
          catch(error) {
            
          }
        });
      }

      else {
      }
      })
    }     
}