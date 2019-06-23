import { Component, OnInit } from '@angular/core';
import {SpotifyServiceClient} from "../services/spotify-service-client";
import {ActivatedRoute} from "@angular/router";
import { UserService } from '../services/user-service-client';
import { CookieService } from 'ngx-cookie-service';
import { PartyService } from '../services/party-service-client';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  track = {
    name: '',
    spotifyId: '',
    artists: [{
      id: '',
      name: ''
    }],
    trackName: '',
    artistName: '',
    album: {
      id: '',
      name: '',
      images: [{
        url: ''
      }]
    },
    external_urls: {
      spotify: ''
    }
  }
  trackId = -1;


  constructor(private spotifyService: SpotifyServiceClient,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private cookieService: CookieService,
              private partyService: PartyService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.trackId = params['trackId'];
        this.spotifyService.getTrackById(this.trackId).then(res => this.track = res);
      });
  }

  addTrackToQueue = () => {
    let spotifyId = this.track["id"];
    let trackName = this.track["name"];
    let artistName = this.track["artists"][0]["name"];
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
