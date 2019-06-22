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
  spotifyUserName = '';
  spotifyUserUrl = '';
  spotifyConnected = false;
  selectedTab = '';
  selectedTabType = '';
  selectedID = '';
  playlists = [];
  tracks = [];
  recent = [];
  following = [];
  selectedSong = {};
  selectedArtist = {};
  selectedPlaylist = {};
  editedFirstName = '';
  editedLastName = '';
  editedPassword = '';

  userId: String;
  myProfile: Boolean;
  editing: Boolean;
  loggedInToSpotify: Boolean;
  validSpotifyToken: Boolean;

  user = {
    username : '',
    firstName : '',
    lastName : '',
    password: '',
    currentPartyId: null,
    userType: 'LISTENER',
    dob: null,
    profilePicturePath : 'assets/images/vinyl-background.png',
    spotifyUser: false,
    spotifyUsername: '',
    spotifyUrl: ''
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
      this.validSpotifyToken = this.spotifyService.validToken();
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
            this.spotifyConnected = res.spotifyUser;
            this.user = res;
            return;
        });
      }
      else {
        this.myProfile = true;
        this.userService.findUserById(this.cookieService.get("_id"))
          .then(res => {
            console.log(res);
            this.spotifyConnected = res.spotifyUser;
            this.user = res;
            return;
        });

      }
  }

  toggleEditing = () => {
    this.editing = !this.editing;
  }

  logout = () => {
    this.userService.logUserOut();
    this.router.navigate(['']);
  }

  confirmChanges = () => {
    if(this.editedFirstName == '' || this.editedPassword == '') {
      this.editedFirstName = this.user.firstName;
      this.editedLastName = this.user.lastName;
      this.editedPassword = this.user.password;
    }
    else {
      this.userService.editUserProfile(this.cookieService.get("_id"), 
        this.editedFirstName, 
        this.editedLastName,
        this.editedPassword)
      .then(status => {
        this.editing = false;
        this.ngOnInit();
      })
    }
  }

  showContent = (id) => {
    this.selectedID = id;
  }

  removeSpotify = () => {
    this.userService.removeSpotifyInformation(this.cookieService.get("_id"))
      .then(status => {
        this.spotifyConnected = false;
        this.loggedInToSpotify = false;
        this.spotifyService.killTokens();
        this.ngOnInit();
      })
  }

  connectSpotify = () => {
    this.spotifyService
      .getCurrentProfile()
        .then(response => {
          this.spotifyUserName = response.display_name; 
          this.spotifyUserUrl = response.external_urls.spotify;
        })
        .then(() => {
          this.userService.addSpotifyInformation(this.cookieService.get("_id"), this.spotifyUserName, this.spotifyUserUrl)
            .then(status => {
              this.ngOnInit();
            })
        })
  }

  selectTab = tabType => {
    switch (tabType) {
      case 'playlist':
        this.selectedTab = 'playlist';
        this.selectedTabType = 'playlist';
        this.spotifyService
          .getCurrentUserPlaylists()
          .then(response => this.playlists = response.items)
        break;
      case 'library':
        this.selectedTab = 'library';
        this.selectedTabType = 'library';
        this.spotifyService
          .getCurrentUserLibrary()
          .then(response => this.tracks = response.items)
        break;
      case 'recent':
        this.selectedTab = 'recent';
        this.selectedTabType = 'recent';
        this.spotifyService
          .getCurrentUserRecent()
          .then(response => this.recent = response.items)
        break;
      case 'following':
        this.selectedTab = 'following';
        this.selectedTabType = 'following';
        this.spotifyService
          .getCurrentUserFollowing()
          .then(response => this.following = response.artists.items)
        break;
      default:
        break;
    }
  }


  selectElementById = (id, content) => {
    switch (this.selectedTabType) {
      case 'playlist':
        return this.selectPlaylistById(id, content);
      case 'library':
        return this.selectTrackById(id, content);
      case 'recent':
        return this.selectTrackById(id, content);
      case 'following':
        return this.selectArtistById(id, content);
    }
  }

  selectPlaylistById = (id, content) => {
    console.log(id)
    this.spotifyService
      .getPlaylistById(id)
      .then(res => {
        this.selectedPlaylist = res;
      })
    this.openContent(content);
  }

  selectArtistById = (id, content) => {
    console.log(id)
    this.spotifyService
      .getArtistById(id)
      .then(res => {
        this.selectedArtist = res;
      })
    this.openContent(content);
  }

  selectTrackById = (id, content) => {
    console.log(id)
    this.spotifyService
      .getTrackById(id)
      .then(response => {
        this.selectedSong = response;
        console.log(response)
      })

    this.openContent(content);
  }


  openContent = (content) => {
    console.log("Opening")
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-playlist'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
