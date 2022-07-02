import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {HelpersService} from "../services/helpers.service";
import {map, mergeMap, tap} from "rxjs";
import {
    addImageFailure,
    addImageRequest,
    addImageSuccess,
    fetchImagesFailure,
    fetchImagesRequest,
    fetchImagesSuccess
} from "./image.actions";
import {AppState} from "./types";
import {Store} from "@ngrx/store";
import {ImagesService} from "../services/images.service";

@Injectable()

export class ImagesEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private imagesService: ImagesService,
        private router: Router,
        private helpers: HelpersService,
    ) {}

    fetchImages = createEffect(() => this.actions.pipe(
        ofType(fetchImagesRequest),
        mergeMap(({placeId}) => this.imagesService.fetchImages(placeId).pipe(
            map(images => fetchImagesSuccess({images})),
            this.helpers.catchServerError(fetchImagesFailure)
        ))));

    addImage = createEffect(() => this.actions.pipe(
        ofType(addImageRequest),
        mergeMap(({image}) => this.imagesService.addImage(image).pipe(
            map(() => addImageSuccess()),
            tap (() => {
                const placeId = image.placeId;
                this.store.dispatch(fetchImagesRequest({placeId}))
            }),
            this.helpers.catchServerError(addImageFailure)
        ))));

}