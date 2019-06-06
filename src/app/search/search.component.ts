import { Component, OnInit } from '@angular/core';
import { SpotifyServiceClient } from '../services/spotify-service-client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchType = 'track';
  searchContent = '';
  searchResults = [];
  searchTitle = '';
  searchPerformed = false;

  constructor(private spotifyService: SpotifyServiceClient) { }

  ngOnInit() {
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

}
