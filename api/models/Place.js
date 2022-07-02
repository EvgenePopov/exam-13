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
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

const Place = mongoose.model('Place' ,PlaceSchema);

module.exports = Place;