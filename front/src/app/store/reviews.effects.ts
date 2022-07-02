import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {HelpersService} from "../services/helpers.service";
import {map, mergeMap, tap} from "rxjs";
import {AppState} from "./types";
import {Store} from "@ngrx/store";
import {
    addReviewFailure,
    addReviewRequest,
    addReviewSuccess,
    fetchReviewsFailure,
    fetchReviewsRequest,
    fetchReviewsSuccess
} from "./reviews.actions";
import {ReviewsService} from "../services/reviews.service";
import {fetchInformationPlaceRequest} from "./place.actions";

@Injectable()

export class ReviewsEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private reviewsService: ReviewsService,
        private router: Router,
        private helpers: HelpersService,
    ) {}

    fetchReviews = createEffect(() => this.actions.pipe(
        ofType(fetchReviewsRequest),
        mergeMap(({placeId}) => this.reviewsService.fetchReviews(placeId).pipe(
            map(reviews => fetchReviewsSuccess({reviews})),
            this.helpers.catchServerError(fetchReviewsFailure)
        ))));

    addReview = createEffect(() => this.actions.pipe(
        ofType(addReviewRequest),
        mergeMap(({review}) => this.reviewsService.addReview(review).pipe(
            map(() => addReviewSuccess()),
            tap (() => {
                const placeId = review.place;
                this.store.dispatch(fetchReviewsRequest({placeId}));
                this.store.dispatch(fetchInformationPlaceRequest({placeId}));
            }),
            this.helpers.catchServerError(addReviewFailure)
        ))));

}