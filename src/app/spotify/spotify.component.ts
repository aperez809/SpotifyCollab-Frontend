import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
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
      this.cookieService.set("spotifyAccessToken", accessToken, undefined, "/");
      this.cookieService.set("spotifyRefreshToken", refreshToken, undefined, "/");
    }
    else {
      this.cookieService.set("spotifyAccessToken", "N/A", undefined, "/");
      this.cookieService.set("spotifyRefreshToken", "N/A", undefined, "/");
    }
    this.router.navigate(['profile']);
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
