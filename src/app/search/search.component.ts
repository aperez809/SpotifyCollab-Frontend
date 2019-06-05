import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchType = 'track';
  searchContent = '';

  constructor() { }

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

    console.log(urlArray.join(""));

  }

  outputSearchContent = () => {
    console.log(this.searchContent);
  }

  updateSearchContent = (event) => {
    this.searchContent = event.target.value;
  }

}
