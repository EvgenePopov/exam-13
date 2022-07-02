import { LoginError, RegisterError, User } from '../models/user.model';
import {PlaceModel} from "../models/place.model";

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
    fetchError: null | string,
    addLoading: boolean,
    addError: null | string,
};

export type AppState = {
    users: UserState,
    places: PlaceState,
}
