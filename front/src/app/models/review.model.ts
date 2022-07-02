export class ReviewModel {
    constructor(
        public _id: string,
        public user: {
            _id: string,
            name: string
        },
        public place: {
            _id: string,
            name: string,
        },
        public comment: string,
        public ratFood: number,
        public ratService: number,
        public ratInterior: number,
        public date: string,
    ) {}
}

export interface ReviewApiModel {
    place: string,
    comment: string,
    ratFood: number,
    ratService: number,
    ratInterior: number,
}

export interface FetchReviewsError {
    error: string
}

export interface AddReviewError {
    error: string
}
