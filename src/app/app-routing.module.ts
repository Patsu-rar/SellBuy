import {NgModule} from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {RegistrationPageComponent} from "./components/authorization/registration-page/registration-page.component";
import {LoginPageComponent} from "./components/authorization/login-page/login-page.component";
import {ProfilePageComponent} from "./components/user/profile-page/profile-page.component";
import {CreateAddPageComponent} from "./components/ad/create-add-page/create-add-page.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {EditProfileComponent} from "./components/user/edit-profile/edit-profile.component";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'create-add', component: CreateAddPageComponent},
  {path: 'edit-profile', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
