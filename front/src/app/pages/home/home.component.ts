import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FetchError, PlaceModel} from "../../models/place.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {Router} from "@angular/router";
import {fetchPlacesRequest} from "../../store/place.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  places: Observable< null | PlaceModel[]>;
  fetchLoading: Observable<null | boolean>;
  fetchError: Observable<null | FetchError>;
  apiUrl = environment.apiUrl;


  constructor(
      private store: Store<AppState>,
      private router: Router,
  ) {
    this.places = store.select(state => state.places.places);
    this.fetchLoading = store.select(state => state.places.fetchLoading);
    this.fetchError = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  getInformation(id: string) {
    void this.router.navigate([`/information-place/${id}`]);
  }

}
