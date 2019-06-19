import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyServiceClient {
    private token : string;
    private refreshToken : string;
    private requestBaseUrl: string;
    private displayName: string;
    private userHref: string;

    constructor() {
        const params = this.getHashParams();
        this.token = params["access_token"];
        this.refreshToken = params["refresh_token"];
        this.requestBaseUrl = "https://api.spotify.com/v1";
        console.log(params);
        console.log(this.token);
        console.log(this.refreshToken);
    }

    loggedIn = () => {
        console.log(this.token)
        if (this.token == null) {
            return false;
        }
        return true;
    }

    searchForItem = (searchContent, searchType) => {
        let requestUrl = this.requestBaseUrl + "/search?q="
        requestUrl = requestUrl + searchContent;
        requestUrl = requestUrl + "&type=" + searchType;
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.token
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
          Authorization: 'Bearer ' + this.token
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
          Authorization: 'Bearer ' + this.token
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
          Authorization: 'Bearer ' + this.token
        }
      }).then(res => res.json())
    }

    getPlaylistById = id => {
        let requestUrl = this.requestBaseUrl + "/playlists/" + id;
        console.log(requestUrl);
        return fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.token
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
                Authorization: 'Bearer ' + this.token
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
                Authorization: 'Bearer ' + this.token
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
                Authorization: 'Bearer ' + this.token
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
                Authorization: 'Bearer ' + this.token
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
                Authorization: 'Bearer ' + this.token
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
