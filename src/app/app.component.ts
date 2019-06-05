import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Song Request';
  activeComponent = 'profile';
  user = {
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
  }

  selectComponent = component => {
    this.activeComponent = component;
  }
}
