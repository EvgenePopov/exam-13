import { LoginError, RegisterError, User } from '../models/user.model';
import {AddError, FetchError, PlaceModel} from "../models/place.model";
import {AddImagesError, FetchImagesError, ImageModel} from "../models/image.model";

export type UserState = {
    user: null | User,
    registerLoading: boolean,
    registerError: null | RegisterError,
    loginLoading: boolean,
    loginError: null | LoginError
};

export type PlaceState = {
    place: null | PlaceModel,
    places: null | PlaceModel[],
    fetchLoading: boolean,
    fetchError: null | FetchError,
    addLoading: boolean,
    addError: null | AddError,
};

export type ImagesState = {
    images: null | ImageModel[],
    fetchImagesLoading: boolean,
    fetchImagesError: null | FetchImagesError,
    addImagesLoading: boolean,
    addImagesError: null | AddImagesError,
};

export type AppState = {
    users: UserState,
    places: PlaceState,
    images: ImagesState,
}
