const express = require('express');
const multer = require("multer");
const config = require("../config");
const path = require("path");
const auth = require("../middleware/auth");
const {nanoid} = require("nanoid");
const Image = require("../models/Images");

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
        const images = await Image.find({place: req.params.id});

        if (images) {
            return res.send(images);
        }

        return res.status(400).send({error: "Not found Images!"});

    } catch (e) {
        return next(e);
    }
});


router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {

        const imageData = {
            user: req.user._id,
            place: req.body.place,
            image: null
        }

        if (req.file){
            imageData.image = req.file.filename;
        }

        const image = new Image(imageData);

        await image.save();

        return res.send({message: 'Added new image in database'});

    } catch (e) {
        return next(e)
    }
});


module.exports = router;