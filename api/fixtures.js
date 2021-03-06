const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Place = require("./models/Place");
const Images = require("./models/Images");
const Reviews = require("./models/Reviews");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [Jack, John] = await User.create({
        email: 'jack@test.com',
        password: '123',
        name: 'Jack Doe',
        token: nanoid(),
        role: "user",
    },{
        email: 'john@test.com',
        password: '123',
        name: 'John Doe',
        token: nanoid(),
        role: "admin",
    });

    const [Marzipan, Biters, Compote] = await Place.create({
        title: 'Марципан (Marzipan)',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dicta eos in minus nemo, nostrum ullam! Aut, commodi consequatur doloribus fuga placeat repellat reprehenderit voluptates.",
        image: "place-1.jpeg",
        user: John,
        rating: 4,
        ratFood: 5,
        ratService: 5,
        ratInterior: 4,
        amountPhoto: 3
    },{
        title: 'Кусаки (Biters)',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dicta eos in minus nemo, nostrum ullam! Aut, commodi consequatur doloribus fuga placeat repellat reprehenderit voluptates.",
        image: "place-2.jpeg",
        user: Jack,
        rating: 4,
        ratFood: 5,
        ratService: 5,
        ratInterior: 4,
        amountPhoto: 4
    },{
        title: 'Компот (Compote)',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dicta eos in minus nemo, nostrum ullam! Aut, commodi consequatur doloribus fuga placeat repellat reprehenderit voluptates.",
        image: "place-3.jpeg",
        user: John,
        rating: 4,
        ratFood: 4,
        ratService: 5,
        ratInterior: 4,
        amountPhoto: 5
    });

    await Images.create({
        user: Jack,
        place: Marzipan,
        image: "item-1.jpeg"
    },{
        user: John,
        place: Marzipan,
        image: "item-2.jpeg"
    },{
        user: Jack,
        place: Marzipan,
        image: "item-4.jpeg"
    },{
        user: John,
        place: Biters,
        image: "item-3.png"
    },{
        user: John,
        place: Biters,
        image: "item-2.jpeg"
    },{
        user: Jack,
        place: Biters,
        image: "item-5.jpeg"
    },{
        user: Jack,
        place: Biters,
        image: "item-4.jpeg"
    },{
        user: Jack,
        place: Compote,
        image: "item-4.jpeg"
    },{
        user: John,
        place: Compote,
        image: "item-3.png"
    },{
        user: John,
        place: Compote,
        image: "item-2.jpeg"
    },{
        user: Jack,
        place: Compote,
        image: "item-5.jpeg"
    },{
        user: Jack,
        place: Compote,
        image: "item-1.jpeg"
    },);

    await Reviews.create({
        user: Jack,
        place: Compote,
        comment: "Good place and good food",
        ratFood: 5,
        ratService: 5,
        ratInterior: 4
    },{
        user: John,
        place: Compote,
        comment: "Good place and good service",
        ratFood: 5,
        ratService: 5,
        ratInterior: 4
    },{
        user: Jack,
        place: Biters,
        comment: "Good place and bad food",
        ratFood: 2,
        ratService: 5,
        ratInterior: 4
    },{
        user: John,
        place: Biters,
        comment: "Good place and bad service",
        ratFood: 5,
        ratService: 1,
        ratInterior: 4
    },{
        user: Jack,
        place: Marzipan,
        comment: "Good place",
        ratFood: 5,
        ratService: 5,
        ratInterior: 5
    },{
        user: John,
        place: Marzipan,
        comment: "Good place",
        ratFood: 5,
        ratService: 5,
        ratInterior: 5
    },)

    await mongoose.connection.close();
};

run().catch(e => console.error(e));