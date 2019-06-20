import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
  availableParties = [];
  apiBaseUrl = "http://song-request-server-node.herokuapp.com/api/";

  constructor() { }
  ngOnInit() {
    this.getPartyList()
      .then(res => {
        this.availableParties = res;
      });
  }

  getPartyList() {
    const partyUrl = this.apiBaseUrl + "parties";
    return fetch(partyUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  }
}
