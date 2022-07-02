import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from "../../environments/environment";
import {map} from "rxjs";
import {ReviewApiModel, ReviewModel} from "../models/review.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    constructor(private http: HttpClient) {}

    fetchReviews(id: string) {
        return this.http.get<ReviewModel[]>(env.apiUrl + '/reviews/' + id).pipe(
            map(response => {
                return response.map(reviewData => {
                    return new ReviewModel(
                        reviewData._id,
                        reviewData.user,
                        reviewData.place,
                        reviewData.comment,
                        reviewData.ratFood,
                        reviewData.ratService,
                        reviewData.ratInterior,
                        reviewData.date,
                    )
                });
            })
        );
    }

    addReview(review: ReviewApiModel) {
        return this.http.post(env.apiUrl + '/reviews' , review);
    }

}
