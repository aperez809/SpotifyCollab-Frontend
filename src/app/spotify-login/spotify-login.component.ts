import { Component, OnInit } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {
  private loggedInToSpotify : boolean;
  selectedTab = '';
  playlists = [];

  constructor(private spotifyService: SpotifyServiceClient) {
    this.loggedInToSpotify = false;
  }

  ngOnInit() {
  }

  selectTab = tabType => {
    switch (tabType) {
      case 'playlist':
        this.selectedTab = 'playlist';
        this.getUserCurrentPlaylists();
        break;
      case 'library':
        this.selectedTab = 'library';
        break;
      case 'recent':
        this.selectedTab = 'recent';
        break;
      case 'following':
        this.selectedTab = 'following';
        break;
      default:
        break;
    }
  }

  getUserCurrentPlaylists() {
    console.log("getting playlists")
    this.spotifyService
      .getCurrentUserPlaylists()
      .then(response => this.playlists = response.items)
  }

}
