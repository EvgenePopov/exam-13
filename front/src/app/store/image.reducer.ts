import {ImagesState} from "./types";
import {createReducer, on} from "@ngrx/store";
import {
    addImageFailure,
    addImageRequest,
    addImageSuccess,
    fetchImagesFailure,
    fetchImagesRequest,
    fetchImagesSuccess,
    removeImagesRequest
} from "./image.actions";


const initialState: ImagesState = {
    images: [],
    fetchImagesLoading: false,
    fetchImagesError: null,
    addImagesLoading: false,
    addImagesError: null
};

export  const imageReducer = createReducer(
    initialState,

    on(fetchImagesRequest, state => ({...state, fetchImagesLoading: true, fetchImagesError: null})),
    on(fetchImagesSuccess, (state, {images}) => ({...state, fetchImagesLoading: false, images})),
    on(fetchImagesFailure, (state, {error}) => ({...state, fetchImagesLoading: false, fetchImagesError: error})),

    on(addImageRequest, state => ({...state, addImagesLoading: true, addImagesError: null})),
    on(addImageSuccess, state => ({...state, addImagesLoading: false})),
    on(addImageFailure, (state, {error}) => ({...state, addImagesLoading: false, addImagesError: error})),

    on(removeImagesRequest, (state, {placeId}) => {
        const updateImages = state.images?.filter( image => {
            return image._id !== placeId.id;
        });

        return {...state, photos: updateImages, removeLoading: true}
    }),

);
