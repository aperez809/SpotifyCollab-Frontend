import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyService {
    private token : string;
    private refreshToken : string;
    private requestBaseUrl: string;

    constructor() {
        const params = this.getHashParams();
        this.token = params["access_token"];
        this.refreshToken = params["refresh_token"];
        this.requestBaseUrl = "https://api.spotify.com/v1";
        console.log(params);
        console.log(this.token);
        console.log(this.refreshToken);
    }

    getCurrentUserPlaylists() {
        let requestUrl = this.requestBaseUrl + "/me/playlists"
        console.log(requestUrl);
        fetch(requestUrl)
            .then(response => response.json())
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