export class PlaceModel {
    constructor(
        public _id: string,
        public title: string,
        public user: {
            _id: string,
            name: string
        },
        public description: string,
        public image: string | File,
    ) {
    }
}

export interface PlaceApiModel {
    _id: string,
    title: string,
    user: {
        _id: string,
        name: string,
    },
    description: string,
    image: string | File,
    agreement: any | boolean,
}

export interface FetchError {
    error: string
}

export interface AddError {
    error: string
}