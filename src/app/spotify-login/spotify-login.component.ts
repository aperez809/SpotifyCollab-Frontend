import { Component, OnInit } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {
  private loggedInToSpotify : boolean;
  playlists = [];

  constructor(private spotifyService: SpotifyServiceClient) {
    this.loggedInToSpotify = false;
  }

  ngOnInit() {
  }

  getUserCurrentPlaylists() {
    console.log("getting playlists")
    this.spotifyService
      .getCurrentUserPlaylists()
      .then(response => this.playlists = response.items)
  }

}
