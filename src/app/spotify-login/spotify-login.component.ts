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
  tracks = [];
  recent = [];
  following = [];

  constructor(private spotifyService: SpotifyServiceClient) {
    this.loggedInToSpotify = true;
  }

  ngOnInit() {
  }

  spotifyLogIn = () => {
    this.loggedInToSpotify = true;
  }

  selectTab = tabType => {
    switch (tabType) {
      case 'playlist':
        this.selectedTab = 'playlist';
        this.spotifyService
          .getCurrentUserPlaylists()
          .then(response => this.playlists = response.items)
        break;
      case 'library':
        this.selectedTab = 'library';
        this.spotifyService
          .getCurrentUserLibrary()
          .then(response => this.tracks = response.items)
        break;
      case 'recent':
        this.selectedTab = 'recent';
        this.spotifyService
          .getCurrentUserRecent()
          .then(response => this.recent = response.items)
        break;
      case 'following':
        this.selectedTab = 'following';
        this.spotifyService
          .getCurrentUserFollowing()
          .then(response => this.following = response.artists.items)
        break;
      default:
        break;
    }
  }

}
