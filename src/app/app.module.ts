import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ShortenComponent } from './shorten/shorten.component';
import { ShortLinkBoxComponent } from './short-link-box/short-link-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavItemComponent,
    HeroBannerComponent,
    ShortenComponent,
    ShortLinkBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
