import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyService {
    private token : string;
    private refreshToken : string;

    constructor() {
        const params = this.getHashParams();
        this.token = params["access_token"];
        this.refreshToken = params["refresh_token"];
        console.log(params);
        console.log(this.token);
        console.log(this.refreshToken);
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