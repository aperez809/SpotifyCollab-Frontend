import { Component, OnInit } from '@angular/core';
import {SpotifyServiceClient} from "../services/spotify-service-client";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlist;
  playlistId;

  constructor(private spotifyService: SpotifyServiceClient,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.playlistId = params['playlistId'];
        this.spotifyService.getPlaylistById(this.playlistId)
          .then(res => this.playlist = res);
      });

  }

}
