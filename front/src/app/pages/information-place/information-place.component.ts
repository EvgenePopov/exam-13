import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {FetchError, PlaceModel} from "../../models/place.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {ActivatedRoute} from "@angular/router";
import {fetchInformationPlaceRequest} from "../../store/place.actions";
import {FetchImagesError, ImageModel} from "../../models/image.model";
import {addImageRequest, fetchImagesRequest} from "../../store/image.actions";

@Component({
  selector: 'app-information-place',
  templateUrl: './information-place.component.html',
  styleUrls: ['./information-place.component.sass']
})
export class InformationPlaceComponent implements OnInit {
  @ViewChild('formPhoto') formPhoto!: NgForm;

  place: Observable <null | PlaceModel>;
  images: Observable <null | ImageModel[]>;
  fetchLoading: Observable <null | boolean>;
  fetchError: Observable <null | FetchError>;
  fetchImagesLoading: Observable <null | boolean>;
  fetchImagesError: Observable <null | FetchImagesError>;
  addImagesLoading: Observable <null | boolean>;
  addImagesError: Observable <null | FetchImagesError>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel;
  placeId!: string;
  placeSub!: Subscription;

  constructor(
      private store: Store<AppState>,
      private route: ActivatedRoute
  ) {
    this.place = store.select(state => state.places.place);
    this.fetchLoading = store.select(state => state.places.fetchLoading);
    this.fetchError = store.select(state => state.places.fetchError);
    this.images = store.select(state => state.images.images);
    this.fetchImagesLoading = store.select( state => state.images.fetchImagesLoading);
    this.fetchImagesError = store.select( state => state.images.fetchImagesError);
    this.addImagesLoading = store.select( state => state.images.addImagesLoading);
    this.addImagesError = store.select( state => state.images.addImagesError);
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      let placeId = params['id'];
      this.placeId = placeId;
      this.store.dispatch(fetchInformationPlaceRequest({placeId}));
      this.placeSub = this.place.subscribe( data => {
        this.placeData = <PlaceModel>data;
        this.store.dispatch(fetchImagesRequest({placeId}));
      });
    });
  }

  onSubmitPhoto() {
    const image = {
      placeId: this.placeId,
      image: this.formPhoto.value.image,
    };

    this.store.dispatch(addImageRequest({image}));
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe();
  }
}
