import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/common/navbar/navbar.component';
import {LoginPageComponent} from './components/authorization/login-page/login-page.component';
import {RegistrationPageComponent} from './components/authorization/registration-page/registration-page.component';
import {CreateAddPageComponent} from './components/ad/create-add-page/create-add-page.component';
import {ProfilePageComponent} from './components/user/profile-page/profile-page.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import { FooterComponent } from './components/common/footer/footer.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import {TimesPipe} from "./pipes/times.pipe";
import {SearchPipe} from "./pipes/search.pipe";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    CreateAddPageComponent,
    ProfilePageComponent,
    MainPageComponent,
    FooterComponent,
    EditProfileComponent,
    TimesPipe,
    SearchPipe
  ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [HttpClient],
  exports: [
    TimesPipe,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
