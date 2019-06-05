import { Component, OnInit, Input } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user : JSON;
  private loggedInToSpotify : boolean;
  spotifyUser;
  selectedTab = '';
  playlists = [];
  tracks = [];
  recent = [];
  following = [];

  constructor(private spotifyService: SpotifyServiceClient) {
    this.loggedInToSpotify = this.spotifyService.loggedIn();
  }

  ngOnInit() {
  }

  connectSpotify = () => {
    this.spotifyService
      .getCurrentProfile()
      .then(response => this.spotifyUser = response.display_name)
  }

  selectTab = tabType => {
    console.log(this.loggedInToSpotify);
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
