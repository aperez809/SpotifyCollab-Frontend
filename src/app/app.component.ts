import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Song Request';
  user = {
    username: 'welchdaniel',
    password:'password',
    firstname: 'Daniel',
    lastname: 'Welch',
    dob: '',
    profilePicturePath: 'assets/images/vinyl-background.png',
    spotifyUser: false,
    spotifyUsername: 'danielwelch3321',
    loggedIn: false
  }
}
