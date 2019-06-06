import { Injectable } from '@angular/core';

@Injectable()
export class UserService { 
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

    findUserByCredentials(username: String, password: String) {
        for (let i = 0; i < this.users.length; i++) {
          const user = this.users[i];
          if (username === user.username &&
            password === user.password) {
            return user;
          }
        }
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