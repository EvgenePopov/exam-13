const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const {nanoid} = require("nanoid");

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
    },{
        email: 'john@test.com',
        password: '123',
        name: 'John Doe',
        token: nanoid(),
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));