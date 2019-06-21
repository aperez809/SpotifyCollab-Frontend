import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { routing } from './app-routing';

import { SpotifyServiceClient } from './services/spotify-service-client';
import { UserService } from './services/user-service-client';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumComponent } from './album/album.component';
import { HomePageComponent } from './homepage/homepage.component';
import { PartyComponent } from './party/party.component';
import { PartyService } from './services/party-service-client'
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    TrackComponent,
    ArtistComponent,
    PlaylistComponent,
    AlbumComponent,
    HomePageComponent,
    PartyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    routing,
    NgbModule
  ],
  providers: [
    SpotifyServiceClient,
    UserService,
    PartyService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
