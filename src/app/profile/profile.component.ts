import { Component, OnInit, Input } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInToSpotify;
  spotifyUserName = '';
  spotifyUserUrl = '';
  selectedTab = '';
  selectedID = '';
  playlists = [];
  tracks = [];
  recent = [];
  following = [];
  selectedPlaylist = {};

  userId: String;
  myProfile: Boolean;
  user = {
    firstName : '',
    lastName : '',
    username : '',
    profilePicturePath : 'assets/images/vinyl-background.png'
  }

  constructor(
      private spotifyService: SpotifyServiceClient, 
      private activatedRoute: ActivatedRoute,
      private modalService: NgbModal,
      private userService: UserService,
      private cookieService: CookieService,
      private router: Router) 
    {
    this.loggedInToSpotify = this.spotifyService.loggedIn();
    if(this.loggedInToSpotify) {
      this.connectSpotify();
    }
  }

  ngOnInit() {
    //this.userService.getSession().then(response => {console.log(response)});
    this.activatedRoute.params.subscribe(
      params => {
        this.userId = params['userId'];
      });
      if(this.userId) {
        this.myProfile = false;
        this.userService.findUserById(this.userId)
          .then(res => {
            console.log(res);
            return this.user = res;
        });
      }
      else {
        this.myProfile = true;

      }
  }

  logout = () => {
    this.userService.logUserOut();
    this.router.navigate(['']);
  }

  openContent = (content) => {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectPlaylist = (id, content) => {
    this.spotifyService
      .getPlaylistById(id)
      .then(response => {
        this.selectedPlaylist = response;
      })
    this.openContent(content);
  }

  showContent = (id) => {
    this.selectedID = id;
  }

  connectSpotify = () => {
    this.spotifyService
      .getCurrentProfile()
      .then(response => {
        this.spotifyUserName = response.display_name; 
        this.spotifyUserUrl = response.external_urls.spotify;
      })
      .then(() => {
        this.userService.addSpotifyInformation(this.cookieService.get("userId"), this.spotifyUserName, this.spotifyUserUrl)
          .then(status => {console.log(status)})
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
