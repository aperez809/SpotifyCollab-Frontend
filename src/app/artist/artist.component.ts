import { Component, OnInit } from '@angular/core';
import {SpotifyServiceClient} from "../services/spotify-service-client";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist;
  artistId;

  constructor(private spotifyService: SpotifyServiceClient,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.artistId = params['artistId'];
        this.spotifyService.getArtistById(this.artistId).then(res => this.artist = res);
      });

  }

}
