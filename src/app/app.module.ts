import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { SpotifyServiceClient } from './services/spotify-service-client';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SpotifyServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
