const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    comment: {
        type: String,
        required: true,
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
    date: {
        type: String,
        default: new Date()
    }

});

const Reviews = mongoose.model('Reviews' ,ReviewsSchema);

module.exports = Reviews;