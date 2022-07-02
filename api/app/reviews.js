const express = require('express');
const auth = require("../middleware/auth");
const Reviews = require("../models/Reviews");
const Place = require("../models/Place");

const router = express.Router();



router.get('/:id', async (req, res, next) => {
    try {
        const reviews = await Reviews.find({place: req.params.id}).populate('user', 'name');

        return res.send(reviews);

    } catch (e) {
        return next(e);
    }
});


router.post('/', auth,  async (req, res, next) => {
    try {

        const reviewData = {
            user: req.user._id,
            place: req.body.place,
            ratFood: req.body.ratFood,
            ratService: req.body.ratService,
            ratInterior: req.body.ratInterior,
            comment: req.body.comment
        }

        const place = await Place.findById({_id: req.body.place});

        const ratingData = {
            rating: Math.round(((place.rating + req.body.ratFood + req.body.ratService + req.body.ratInterior) / 3)),
            ratFood: Math.round(((place.ratFood + req.body.ratFood) / 2)),
            ratService: Math.round(((place.ratService + req.body.ratService) / 2)),
            ratInterior: Math.round(((place.ratInterior + req.body.ratInterior) / 2)),
        }

        await Place.updateOne({_id: req.body.place}, {rating: ratingData.rating, ratFood: ratingData.ratFood, ratService: ratingData.ratService, ratInterior: ratingData.ratInterior});

        const review = new Reviews(reviewData);

        await review.save();

        return res.send({message: 'Added new review in database'});

    } catch (e) {
        return next(e)
    }
});


module.exports = router;