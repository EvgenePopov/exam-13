import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlaceApiModel, PlaceModel} from "../models/place.model";
import {environment as env} from "../../environments/environment";
import {map} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    constructor(private http: HttpClient) {}

    fetchInformationPlace(placeId: string) {
        return this.http.get<PlaceModel>(env.apiUrl + '/places/' + placeId);
    }

    fetchPlaces() {
        return this.http.get<PlaceModel[]>(env.apiUrl + '/places').pipe(
            map(response => {
                return response.map(placeData => {
                    return new PlaceModel(
                        placeData._id,
                        placeData.title,
                        placeData.user,
                        placeData.description,
                        placeData.image
                    )
                });
            })
        );
    }

    addPlaces(place: PlaceApiModel) {
        const formData = new FormData();
        formData.append('title', place.title);
        formData.append('description', place.description);

        if (place.image) {
            formData.append('image', place.image);
        }

        return this.http.post(env.apiUrl + '/places', formData);
    }

}
