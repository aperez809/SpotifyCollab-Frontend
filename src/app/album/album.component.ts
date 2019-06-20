import { Component, OnInit } from '@angular/core';
import {SpotifyServiceClient} from "../services/spotify-service-client";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album;
  albumId;

  constructor(private spotifyService: SpotifyServiceClient,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.albumId = params['albumId'];
        this.spotifyService.getAlbumById(this.albumId).then(res => this.album = res);
      });

  }

}
