const express = require('express');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const Place = require("../models/Place");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploadsPath);
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/:id', async (req, res, next) => {
    try {

        const place = await Place.findById({_id: req.params.id});

        if (place) {
            return res.send(place);
        }

        return res.status(400).send({error: 'Not found place!'});

    } catch (e) {
        return next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {

        const places = await Place.find();

        return res.send(places);

    } catch (e) {
        return next(e);
    }
});


router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (req.body.agreement === "true") {
            const placeData = {
                title: req.body.title,
                user: req.user._id,
                description: req.body.description,
                image: null
            }

            if (req.file){
                placeData.image = req.file.filename;
            }

            const place = new Place(placeData);
            await place.save();

            return res.send({message: 'Added new place in database'});
        }

        return res.status(400).send({error: "No agreement"});

   } catch (e) {
       return next(e)
   }
});


module.exports = router;