import { Injectable } from '@angular/core';

@Injectable()
export class UserService { 
    private requestBaseUrl: string;
    private sessionBaseUrl: string;

    constructor() {
      this.requestBaseUrl = "https://song-request-server-node.herokuapp.com/api/users/login";
      this.sessionBaseUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value";
    }

    users = [
        {
            id: 123,
            username: 'username',
            password:'password',
            firstname: 'First',
            lastname: 'Last',
            dob: '',
            profilePicturePath: 'assets/images/vinyl-background.png',
            spotifyUser: false,
            spotifyUsername: '',
            spotifyUrl: '',
            loggedIn: false
        },
        {
            id: 456,
            username: 'welchdaniel',
            password:'password',
            firstname: 'Dan',
            lastname: 'Welch',
            dob: '',
            profilePicturePath: 'assets/images/vinyl-background.png',
            spotifyUser: true,
            spotifyUsername: 'dwelch',
            spotifyUrl: '',
            loggedIn: false
        }
    ];

    findUserByCredentials(un: String, pw: String) {
      return fetch("https://song-request-server-node.herokuapp.com/api/users/login", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          username: un,
          password: pw
        }),
        headers: {
            "content-type": "application/json"
        }
      })
        .then(user => {
          if (user) {
            const assignedSessionId = user["_id"];
            const requestSessionUrl = "https://song-request-server-node.herokuapp.com/api/session/set/:name/:value".replace(':name', "sessionId").replace(':value', assignedSessionId)
            return fetch(requestSessionUrl, {
              credentials: 'include',
              method: "POST",
              headers: {
                "content-type": "application/json"
              }
            })
            .then(res => {return res.json()});
          }
          else {
            //Show error message stating that login credentials were incorrect
          }
        });
      /*
        for (let i = 0; i < this.users.length; i++) {
          const user = this.users[i];
          if (username === user.username &&
            password === user.password) {
            return user;
          }
        }
        */
    }

    findUserById(userId) {
        for (let i = 0; i < this.users.length; i++) {
          const user = this.users[i];
          if (userId == user.id) {
            return user;
          }
        }
    }
       
       
     
}