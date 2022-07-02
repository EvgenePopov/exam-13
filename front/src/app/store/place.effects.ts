import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {HelpersService} from "../services/helpers.service";
import {map, mergeMap, tap} from "rxjs";
import {
    addPlacesFailure,
    addPlacesRequest,
    addPlacesSuccess,
    fetchInformationPlaceFailure,
    fetchInformationPlaceRequest,
    fetchInformationPlaceSuccess,
    fetchPlacesFailure,
    fetchPlacesRequest,
    fetchPlacesSuccess,
    removePlaceRequest,
    removePlaceSuccess
} from "./place.actions";
import {PlacesService} from "../services/places.service";
import {Store} from "@ngrx/store";
import {AppState} from "./types";

@Injectable()

export class PlaceEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private placesService: PlacesService,
        private router: Router,
        private helpers: HelpersService,
    ) {}

    fetchInformationPlace = createEffect(() => this.actions.pipe(
        ofType(fetchInformationPlaceRequest),
        mergeMap(({placeId}) => this.placesService.fetchInformationPlace(placeId).pipe(
            map(place => fetchInformationPlaceSuccess({place})),
            this.helpers.catchServerError(fetchInformationPlaceFailure)
        ))));

    fetchPlaces = createEffect(() => this.actions.pipe(
        ofType(fetchPlacesRequest),
        mergeMap(() => this.placesService.fetchPlaces().pipe(
            map(places => fetchPlacesSuccess({places})),
            this.helpers.catchServerError(fetchPlacesFailure)
        ))));

    addPlaces = createEffect(() => this.actions.pipe(
        ofType(addPlacesRequest),
        mergeMap(({place}) => this.placesService.addPlaces(place).pipe(
            map(() => addPlacesSuccess()),
            tap (() => {
                void this.router.navigate(["/"]);
            }),
            this.helpers.catchServerError(addPlacesFailure)
        ))));

    removePlace = createEffect(() => this.actions.pipe(
        ofType(removePlaceRequest),
        mergeMap(({placeId}) => this.placesService.removePlace(placeId).pipe(
            map(() => removePlaceSuccess())
        )),tap (() => {
            this.helpers.openSnackbar('Delete done!');
            this.store.dispatch(fetchPlacesRequest());
        }),
    ));

}