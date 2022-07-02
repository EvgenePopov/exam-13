const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }

});

const Image = mongoose.model('Image' ,ImageSchema);

module.exports = Image;