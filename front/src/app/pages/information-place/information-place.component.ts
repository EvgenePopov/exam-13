import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {FetchError, PlaceModel} from "../../models/place.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/types";
import {ActivatedRoute} from "@angular/router";
import {fetchInformationPlaceRequest} from "../../store/place.actions";
import {AddImagesError, FetchImagesError, ImageModel} from "../../models/image.model";
import {addImageRequest, fetchImagesRequest} from "../../store/image.actions";
import {AddReviewError, FetchReviewsError, ReviewModel} from "../../models/review.model";
import {addReviewRequest, fetchReviewsRequest} from "../../store/reviews.actions";
import {NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-information-place',
  templateUrl: './information-place.component.html',
  styleUrls: ['./information-place.component.sass']
})
export class InformationPlaceComponent implements OnInit {
  @ViewChild('formPhoto') formPhoto!: NgForm;
  @ViewChild('formReview') formReview!: NgForm;

  place: Observable <null | PlaceModel>;
  images: Observable <null | ImageModel[]>;
  reviews: Observable <null | ReviewModel[]>;
  fetchLoading: Observable <null | boolean>;
  fetchError: Observable <null | FetchError>;
  fetchImagesLoading: Observable <null | boolean>;
  fetchImagesError: Observable <null | FetchImagesError>;
  addImagesLoading: Observable <null | boolean>;
  addImagesError: Observable <null | AddImagesError>;
  fetchReviewLoading: Observable <null | boolean>;
  fetchReviewError: Observable <null | FetchReviewsError>;
  addReviewLoading: Observable <null | boolean>;
  addReviewError: Observable <null | AddReviewError>;
  apiUrl = environment.apiUrl;
  placeData!: PlaceModel;
  placeId!: string;
  placeSub!: Subscription;

  constructor(
      private store: Store<AppState>,
      private route: ActivatedRoute,
      private config: NgbRatingConfig
  ) {
    this.place = store.select(state => state.places.place);
    this.fetchLoading = store.select(state => state.places.fetchLoading);
    this.fetchError = store.select(state => state.places.fetchError);
    this.images = store.select(state => state.images.images);
    this.fetchImagesLoading = store.select( state => state.images.fetchImagesLoading);
    this.fetchImagesError = store.select( state => state.images.fetchImagesError);
    this.addImagesLoading = store.select( state => state.images.addImagesLoading);
    this.addImagesError = store.select( state => state.images.addImagesError);
    this.reviews = store.select(state => state.reviews.reviews);
    this.fetchReviewLoading = store.select(state => state.reviews.fetchReviewsLoading);
    this.fetchReviewError = store.select(state => state.reviews.fetchReviewsError);
    this.addReviewLoading = store.select(state => state.reviews.addReviewsLoading);
    this.addReviewError = store.select(state => state.reviews.addReviewsError);
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      let placeId = params['id'];
      this.placeId = placeId;
      this.store.dispatch(fetchInformationPlaceRequest({placeId}));
      this.placeSub = this.place.subscribe( data => {
        this.placeData = <PlaceModel>data;
        this.store.dispatch(fetchImagesRequest({placeId}));
        this.store.dispatch(fetchReviewsRequest({placeId}));
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

  onSubmitReview() {
    const review = {
      place: this.placeId,
      ratFood: this.formReview.value.ratFood,
      ratService: this.formReview.value.ratService,
      ratInterior: this.formReview.value.ratService,
      comment: this.formReview.value.comment
    };
    this.store.dispatch(addReviewRequest({review}));
    this.formReview.resetForm();
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe();
  }

}
