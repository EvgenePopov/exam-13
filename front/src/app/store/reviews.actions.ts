import {createAction, props} from "@ngrx/store";
import {AddReviewError, FetchReviewsError, ReviewApiModel, ReviewModel} from "../models/review.model";
import {RemoveImage} from "../models/image.model";

export const fetchReviewsRequest = createAction('[Reviews] Fetch Reviews Request', props<{placeId: string}>());
export const fetchReviewsSuccess = createAction('[Reviews] Fetch Reviews Success', props<{reviews: ReviewModel[]}>());
export const fetchReviewsFailure = createAction('[Reviews] Fetch Reviews Failure', props<{error: null | FetchReviewsError}>());

export const addReviewRequest = createAction('[Reviews] Add Request', props<{review: ReviewApiModel}>());
export const addReviewSuccess = createAction('[Reviews] Add Success');
export const addReviewFailure = createAction('[Reviews] Add Failure', props<{error: null | AddReviewError}>());

export const removeReviewRequest = createAction('[Reviews] Remove Request', props<{placeId: RemoveImage}>());
export const removeReviewSuccess = createAction('[Reviews] Remove Success');