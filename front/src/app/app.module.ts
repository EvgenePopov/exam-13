import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './ui/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MatMenuModule} from "@angular/material/menu";
import {UserTypeDirective} from "./directives/user-type.directive";
import {localStorageSync} from "ngrx-store-localstorage";
import {userReducer} from "./store/users.reduser";
import {UsersEffects} from "./store/users.effects";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from './pages/login/login.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {RegisterComponent} from './pages/register/register.component';
import {ValidatePasswordDirective} from "./validate-password.directive";
import {InformationPlaceComponent} from './pages/information-place/information-place.component';
import {placeReducer} from "./store/place.reducer";
import {PlaceEffects} from "./store/place.effects";
import {HomeComponent} from './pages/home/home.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AddNewPlaceComponent} from './pages/add-new-place/add-new-place.component';
import {FileInputComponent} from "./ui/file-input/file-input.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthInterceptor} from "./auth.iterceptor";
import {imageReducer} from "./store/image.reducer";
import {ImagesEffects} from "./store/images.effects";
import {reviewReducer} from "./store/reviews.reducer";
import {ReviewsEffects} from "./store/reviews.effects";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
    return localStorageSync({
        keys: [{'users': ['user']}],
        rehydrate: true
    })(reducer);
}

const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];

@NgModule({
  declarations: [
      AppComponent,
      LayoutComponent,
      UserTypeDirective,
      LoginComponent,
      RegisterComponent,
      ValidatePasswordDirective,
      InformationPlaceComponent,
      HomeComponent,
      AddNewPlaceComponent,
      FileInputComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        StoreModule.forRoot({
            users: userReducer,
            places: placeReducer,
            images: imageReducer,
            reviews: reviewReducer,
        }, {metaReducers}),
        EffectsModule.forRoot([UsersEffects, PlaceEffects, ImagesEffects, ReviewsEffects]),
        MatMenuModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        FlexModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        NgbModule,
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
