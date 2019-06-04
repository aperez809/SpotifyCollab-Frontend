import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';

@Injectable()
export class SpotifyService {

    constructor() {
        const params = this.getHashParams();
        const token = params["access_token"];
        const spotifyApi = new SpotifyWebApi();
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        console.log(params);
        console.log(token);
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }

}