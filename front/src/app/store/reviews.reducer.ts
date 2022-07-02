import {createReducer, on} from "@ngrx/store";
import {
    addReviewFailure,
    addReviewRequest,
    addReviewSuccess,
    fetchReviewsFailure,
    fetchReviewsRequest,
    fetchReviewsSuccess
} from "./reviews.actions";
import {ReviewsState} from "./types";


const initialState: ReviewsState = {
    reviews: [],
    fetchReviewsLoading: false,
    fetchReviewsError: null,
    addReviewsLoading: false,
    addReviewsError: null
};

export  const reviewReducer = createReducer(
    initialState,

    on(fetchReviewsRequest, state => ({...state, fetchReviewsLoading: true, fetchReviewsError: null})),
    on(fetchReviewsSuccess, (state, {reviews}) => ({...state, fetchReviewsLoading: false, reviews})),
    on(fetchReviewsFailure, (state, {error}) => ({...state, fetchReviewsLoading: false, fetchReviewsError: error})),

    on(addReviewRequest, state => ({...state, addReviewsLoading: true, addReviewsError: null})),
    on(addReviewSuccess, state => ({...state, addReviewsLoading: false})),
    on(addReviewFailure, (state, {error}) => ({...state, addReviewsLoading: false, addReviewsError: error})),

);
