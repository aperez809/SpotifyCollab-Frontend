import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {
  private loggedInToSpotify : boolean;

  constructor(private spotifyService: SpotifyService) {
    this.loggedInToSpotify = false;
  }

  ngOnInit() {
  }

}
