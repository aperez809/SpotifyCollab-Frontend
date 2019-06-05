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
    let content = this.urlifyContent();
    let type = this.searchType;
    this.spotifyService.searchForItem(content, type);
  }

  outputSearchContent = () => {
    console.log(this.searchContent);
  }

  updateSearchContent = (event) => {
    this.searchContent = event.target.value;
  }

}
