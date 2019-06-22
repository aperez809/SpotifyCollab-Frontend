import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
  ) { 
    this.setTokenCookies();
  }

  ngOnInit() {
  }

  loggedIn = () => {
    return this.cookieService.check("spotifyAccessToken");
  }

  setTokenCookies = () => {
    const params = this.getHashParams();
    const accessToken = params["access_token"];
    const refreshToken = params["refresh_token"];
    console.log(accessToken);
    console.log(refreshToken);
    if (accessToken != "") {
      //(!(this.cookieService.get("spotifyAccessToken") && this.cookieService.get("spotifyRefreshToken"))) {
      this.cookieService.set("spotifyAccessToken", accessToken);
      this.cookieService.set("spotifyRefreshToken", refreshToken);
    }
    else {
      this.cookieService.set("spotifyAccessToken", "N/A");
      this.cookieService.set("spotifyRefreshToken", "N/A");
    }
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
