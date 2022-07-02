import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from "../../environments/environment";
import {map} from "rxjs";
import {ImageApiModel, ImageModel, RemoveImage} from "../models/image.model";

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    constructor(private http: HttpClient) {}

    fetchImages(id: string) {
        return this.http.get<ImageModel[]>(env.apiUrl + '/images/' + id).pipe(
            map(response => {
                return response.map(imageData => {
                    return new ImageModel(
                        imageData._id,
                        imageData.user,
                        imageData.place,
                        imageData.image
                    )
                });
            })
        );
    }

    addImage(image: ImageApiModel) {
        const formData = new FormData();
        formData.append('placeId', image.placeId);

        if (image.image) {
            formData.append('image', image.image);
        }

        return this.http.post(env.apiUrl + '/images' , formData);
    }

    removeImage(idData: RemoveImage) {
        return this.http.delete(env.apiUrl + '/images/' + idData.id);
    }

}
