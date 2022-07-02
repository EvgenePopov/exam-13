import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {FetchError, PlaceModel} from "../../models/place.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {ActivatedRoute} from "@angular/router";
import {fetchInformationPlaceRequest} from "../../store/place.actions";

@Component({
  selector: 'app-information-place',
  templateUrl: './information-place.component.html',
  styleUrls: ['./information-place.component.sass']
})
export class InformationPlaceComponent implements OnInit {
  place: Observable <null | PlaceModel>;
  fetchLoading: Observable <null | boolean>;
  fetchError: Observable <null | FetchError>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel;
  placeSub!: Subscription;

  constructor(
      private store: Store<AppState>,
      private route: ActivatedRoute
  ) {
    this.place = store.select(state => state.places.place);
    this.fetchLoading = store.select(state => state.places.fetchLoading);
    this.fetchError = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const placeId = params['id'];
      this.store.dispatch(fetchInformationPlaceRequest({placeId}));
      this.placeSub = this.place.subscribe( data => {
        this.placeData = <PlaceModel>data;
      });
    });
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe();
  }
}
