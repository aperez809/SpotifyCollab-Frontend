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
        {_id: 123, username: 'alice', password: 'alice'},
        {_id: 234, username: 'bob', password: 'bob'}
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