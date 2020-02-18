import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, SpinnerComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 3000
    })
  ],
  providers: [CookieService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
