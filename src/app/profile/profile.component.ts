import { Component, OnInit, Input } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user-service-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private loggedInToSpotify : boolean;
  spotifyUserName = '';
  spotifyUserUrl = '';
  selectedTab = '';
  playlists = [];
  tracks = [];
  recent = [];
  following = [];

  userId: String;
  user: Object;

  constructor(
      private spotifyService: SpotifyServiceClient, 
      private activatedRoute: ActivatedRoute,
      private userService: UserService) 
    {
    this.loggedInToSpotify = this.spotifyService.loggedIn();
    if(this.loggedInToSpotify) {
      this.connectSpotify();
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.userId = params['userId'];
        this.user = this.userService.findUserById(this.userId);
      });
  }

  logProfile = () => {
    console.log(this.spotifyUserName);
    console.log(this.spotifyUserUrl);
  }

  connectSpotify = () => {
    this.spotifyService
      .getCurrentProfile()
      .then(response => {
        this.spotifyUserName = response.display_name; 
        this.spotifyUserUrl = response.external_urls.spotify;
      })
  }

  selectTab = tabType => {
    this.connectSpotify();
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
