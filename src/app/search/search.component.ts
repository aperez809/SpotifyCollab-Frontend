import { Component, OnInit } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import {PartyService} from "../services/party-service-client";
import { UserService } from '../services/user-service-client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchType = 'track';
  renderedSearchType = '';
  searchContent = '';
  searchResults = [];
  searchTitle = '';
  searchPerformed = false;
  selectedSong = {};
  selectedArtist = {};
  selectedPlaylist = {};
  selectedAlbum = {};

  constructor(
    private spotifyService: SpotifyServiceClient,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private userService: UserService,
    private partyService: PartyService) { }


  ngOnInit() {
  }

  selectSearchById = (id, content) => {
    switch (this.renderedSearchType) {
      case 'track':
        return this.selectTrackById(id, content);
      case 'artist':
        return this.selectArtistById(id, content);
      case 'album':
        return this.selectAlbumById(id, content);
      case 'playlist':
        return this.selectPlaylistById(id, content);
    }
  }

  selectPlaylistById = (id, content) => {
    this.spotifyService
      .getPlaylistById(id)
      .then(res => {
        this.selectedPlaylist = res;
      })
    this.openContent(content);
  }


  selectAlbumById = (id, content) => {
    this.spotifyService
      .getAlbumById(id)
      .then(res => {
        this.selectedAlbum = res;
      })
    this.openContent(content);
  }


  selectArtistById = (id, content) => {
    this.spotifyService
      .getArtistById(id)
      .then(res => {
        this.selectedArtist = res;
      })
    this.openContent(content);
  }

  selectTrackById = (id, content) => {
    this.spotifyService
      .getTrackById(id)
      .then(response => {
        this.selectedSong = response;
        console.log(response)
      })

    this.openContent(content);
  }


  openContent = (content) => {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectSearchType = searchType => {
    this.searchType = searchType;
  }

  urlifyContent = () => {
    let contentArray = this.searchContent.split('');
    let urlArray = [];
    contentArray.forEach(character => {
      if (character == ' ') {
        urlArray.push('%20');
      }
      else {
        urlArray.push(character);
      }
    })
    return (urlArray.join(""));
  }

  search = () => {
    if (this.searchContent !== '') {
      this.renderedSearchType = this.searchType;
      let content = this.urlifyContent();
      let type = this.searchType;
      this.searchPerformed = true;
      switch (this.searchType){
        case 'track':
          this.searchTitle = 'Songs:';
          this.spotifyService
            .searchForItem(content, type)
            .then(response => this.searchResults = response.tracks.items);
          break;
        case 'artist':
          this.searchTitle = 'Artists:';
          this.spotifyService
            .searchForItem(content, type)
            .then(response => this.searchResults = response.artists.items);
          break;
        case 'album':
          this.searchTitle = 'Albums:';
          this.spotifyService
            .searchForItem(content, type)
            .then(response => this.searchResults = response.albums.items);
          break;
        case 'playlist':
          this.searchTitle = 'Playlists:';
          this.spotifyService
            .searchForItem(content, type)
            .then(response => this.searchResults = response.playlists.items);
          break;
        default:
          return;
      }
    }
  }

  outputSearchContent = () => {
    console.log(this.searchContent);
  }

  updateSearchContent = (event) => {
    this.searchContent = event.target.value;
  }

  addTrackToQueue = () => {
    let spotifyId = this.selectedSong["id"];
    let trackName = this.selectedSong["name"];
    let artistName = this.selectedSong["artists"][0]["name"];
    this.userService.addRecentTrack(this.cookieService.get("_id"),
        spotifyId, trackName, artistName)
      .then(res => {
        this.partyService.addSongToQueue(this.cookieService.get("currentPartyId"), 
          spotifyId, 
          trackName, 
          artistName,
          this.cookieService.get("_id"))
          .then(res => {
            return
          })
      })
  }
}
