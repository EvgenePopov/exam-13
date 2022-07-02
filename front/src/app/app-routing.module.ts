import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {InformationPlaceComponent} from "./pages/information-place/information-place.component";
import {AddNewPlaceComponent} from "./pages/add-new-place/add-new-place.component";
import {AuthGuardService} from "./services/auth.guard.service";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "information-place/:id", component: InformationPlaceComponent},
  {path: "add-new-place", component: AddNewPlaceComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
