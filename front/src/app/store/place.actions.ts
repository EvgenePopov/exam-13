import {createAction, props} from "@ngrx/store";
import {AddError, FetchError, PlaceApiModel, PlaceModel} from "../models/place.model";

export const fetchInformationPlaceRequest = createAction('[Place] Fetch Info Request', props<{placeId: string}>());
export const fetchInformationPlaceSuccess = createAction('[Place] Fetch Info Success', props<{place: PlaceModel}>());
export const fetchInformationPlaceFailure = createAction('[Place] Fetch Info Failure', props<{error: null | FetchError}>());

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction('[Places] Fetch Success', props<{places: PlaceModel[]}>());
export const fetchPlacesFailure = createAction('[Places] Fetch Failure', props<{error: null | FetchError}>());

export const addPlacesRequest = createAction('[Places] Add Request', props<{place: PlaceApiModel}>());
export const addPlacesSuccess = createAction('[Places] Add Success');
export const addPlacesFailure = createAction('[Places] Add Failure', props<{error: null | AddError}>());

export const removePlaceRequest = createAction('[Places] Remove Request', props<{placeId: string}>());
export const removePlaceSuccess = createAction('[Places] Remove Success');