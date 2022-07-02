const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    title: {
        type: String,
        require
    },
    description: {
        type: String,
        require
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        max: 5.0
    },
    ratFood: {
        type: Number,
        default: 0,
        max: 5.0
    },
    ratService: {
        type: Number,
        default: 0,
        max: 5.0
    },
    ratInterior: {
        type: Number,
        default: 0,
        max: 5.0
    },
    amountPhoto: {
        type: Number,
        default: 0,
    }

});

const Place = mongoose.model('Place' ,PlaceSchema);

module.exports = Place;