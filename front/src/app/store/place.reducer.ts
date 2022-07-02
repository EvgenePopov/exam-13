import {PlaceState} from "./types";
import {createReducer, on} from "@ngrx/store";
import {
    addPlacesFailure,
    addPlacesRequest,
    addPlacesSuccess, fetchInformationPlaceFailure, fetchInformationPlaceRequest, fetchInformationPlaceSuccess,
    fetchPlacesFailure,
    fetchPlacesRequest,
    fetchPlacesSuccess, removePlaceRequest
} from "./place.actions";

const initialState: PlaceState = {
    place: null,
    places: [],
    fetchLoading: false,
    fetchError: null,
    addLoading: false,
    addError: null
};

export  const placeReducer = createReducer(
    initialState,

    on(fetchInformationPlaceRequest, state => ({...state, fetchLoading: true, fetchError: null})),
    on(fetchInformationPlaceSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
    on(fetchInformationPlaceFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

    on(fetchPlacesRequest, state => ({...state, fetchLoading: true, fetchError: null})),
    on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
    on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

    on(addPlacesRequest, state => ({...state, addLoading: true, addError: null})),
    on(addPlacesSuccess, state => ({...state, addLoading: false})),
    on(addPlacesFailure, (state, {error}) => ({...state, addLoading: false, addError: error})),

    on(removePlaceRequest, (state, {placeId}) => {
        const updatePlaces = state.places?.filter( place => {
            return place._id !== placeId;
        });

        return {...state, photos: updatePlaces, removeLoading: true}
    }),
);
