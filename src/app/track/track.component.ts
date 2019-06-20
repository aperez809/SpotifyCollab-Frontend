import { Component, OnInit } from '@angular/core';
import {SpotifyServiceClient} from "../services/spotify-service-client";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  track;
  trackId = -1;


  constructor(private spotifyService: SpotifyServiceClient,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.trackId = params['trackId'];
        this.track = this.spotifyService.getTrackById(this.trackId);
        console.log(this.track);
      });

  }

}
