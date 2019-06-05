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

  outputSearchContent = () => {
    console.log(this.searchContent);
  }

  updateSearchContent = (event) => {
    this.searchContent = event.target.value;
  }

}
