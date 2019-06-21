import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SpotifyServiceClient {
    private token : string;
    private refreshToken : string;
    private requestBaseUrl: string;
    private displayName: string;
    private userHref: string;

    constructor(private cookieService: CookieService) {}

    loggedIn = () => {
        return this.cookieService.check("spotifyAccessToken")
    }

    setTokenCookies = () => {
        const params = this.getHashParams();
        console.log(params);
        this.requestBaseUrl = "https://api.spotify.com/v1";
        if (params["access_token"] && params["refresh_token"]) {
            //(!(this.cookieService.get("spotifyAccessToken") && this.cookieService.get("spotifyRefreshToken"))) {
            console.log("FIRUWFHEWUBWUFEWNFOQIHWFNE");
            this.cookieService.set("spotifyAccessToken", params["access_token"]);
            this.cookieService.set("spotifyRefreshToken", params["refresh_token"]);
        }
    }

    searchForItem = (searchContent, searchType) => {
        let requestUrl = this.requestBaseUrl + "/search?q="
        requestUrl = requestUrl + searchContent;
        requestUrl = requestUrl + "&type=" + searchType;
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }


    getAlbumById = (id) => {
      let requestUrl = this.requestBaseUrl + "/albums/" + id;
      console.log(requestUrl)
      return fetch(requestUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
        }
      })
        .then(res => res.json());
    }

    getArtistById = (id) => {
      let requestUrl = this.requestBaseUrl + "/artists/" + id;
      console.log(requestUrl)
      return fetch(requestUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
        }
      })
        .then(res => res.json());

    }


    getTrackById = (id) => {
      console.log(id)
      let requestUrl = this.requestBaseUrl + "/tracks/" + id;
      console.log(requestUrl)
      return fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
        }
      }).then(res => res.json())
    }

    getPlaylistById = id => {
        let requestUrl = this.requestBaseUrl + "/playlists/" + id;
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }

    getCurrentProfile = () => {
        let requestUrl = this.requestBaseUrl + "/me"
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }

    getCurrentUserPlaylists = () => {
        let requestUrl = this.requestBaseUrl + "/me/playlists"
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }

    getCurrentUserLibrary = () => {
        let requestUrl = this.requestBaseUrl + "/me/tracks"
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }

    getCurrentUserRecent = () => {
        let requestUrl = this.requestBaseUrl + "/me/player/recently-played"
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
    }

    getCurrentUserFollowing = () => {
        let requestUrl = this.requestBaseUrl + "/me/following?type=artist"
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.cookieService.get("spotifyAccessToken")
            }
        })
            .then(response => {return response.json()})
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
