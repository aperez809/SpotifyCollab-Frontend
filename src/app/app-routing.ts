import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './homepage/homepage.component';
import {TrackComponent} from './track/track.component';
import {ArtistComponent} from './artist/artist.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {AlbumComponent} from './album/album.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'search', component: SearchComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'track/:trackId', component: TrackComponent},
  { path: 'artist/:artistId', component: ArtistComponent},
  { path: 'album/:albumId', component: AlbumComponent},
  { path: 'playlist/:playlistId', component: PlaylistComponent}

];

export const routing = RouterModule.forRoot(appRoutes);
