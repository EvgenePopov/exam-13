export class ImageModel {
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
        public image: string | File,
    ) {
    }
}

export interface ImageApiModel {
    placeId: string,
    image: string | File,
}

export interface FetchImagesError {
    error: string
}

export interface AddImagesError {
    error: string
}