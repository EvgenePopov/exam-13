import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FetchError, PlaceModel} from "../../models/place.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {Router} from "@angular/router";
import {fetchPlacesRequest, removePlaceRequest} from "../../store/place.actions";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  user: Observable<null | User>;
  places: Observable< null | PlaceModel[]>;
  fetchLoading: Observable<null | boolean>;
  fetchError: Observable<null | FetchError>;
  apiUrl = environment.apiUrl;


  constructor(
      private store: Store<AppState>,
      private router: Router,
      private config: NgbRatingConfig
  ) {
    this.user = store.select(state => state.users.user);
    this.places = store.select(state => state.places.places);
    this.fetchLoading = store.select(state => state.places.fetchLoading);
    this.fetchError = store.select(state => state.places.fetchError);
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  RemovePlace(id: string) {
    let placeId = id;
    this.store.dispatch(removePlaceRequest({placeId}));
  }


}
