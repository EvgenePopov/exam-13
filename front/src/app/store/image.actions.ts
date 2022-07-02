import {createAction, props} from "@ngrx/store";
import {AddImagesError, FetchImagesError, ImageApiModel, ImageModel, RemoveImage} from "../models/image.model";

export const fetchImagesRequest = createAction('[Images] Fetch Images Request', props<{placeId: string}>());
export const fetchImagesSuccess = createAction('[Images] Fetch Images Success', props<{images: ImageModel[]}>());
export const fetchImagesFailure = createAction('[Images] Fetch Images Failure', props<{error: null | FetchImagesError}>());

export const addImageRequest = createAction('[Images] Add Request', props<{image: ImageApiModel}>());
export const addImageSuccess = createAction('[Images] Add Success');
export const addImageFailure = createAction('[Images] Add Failure', props<{error: null | AddImagesError}>());

export const removeImagesRequest = createAction('[Images] Remove Request', props<{placeId: RemoveImage}>());
export const removeImagesSuccess = createAction('[Images] Remove Success');