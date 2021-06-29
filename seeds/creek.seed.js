const mongoose = require('mongoose');

const Creek = require('../models/Creek');
const db = require('../db');

const creekSeed = [
    {
        name: 'Santo Tomas',
        img: ['https://www.cometemenorca.com/static/uploads/esbruc-sant-tomas-comete-menorca-playa.jpg'],
        lat: 39.91333,
        lng: 4.04210
    }
]

mongoose.connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allCreeks = await Creek.find();
        if (allCreeks.length) {
            await Creek.collection.drop();
        }
    })
    .then(async () => {
        await Creek.insertMany(creekSeed);
    })
    .catch((error) => {
        console.log('We couldn´t insert the Creeks seed to the data base')
    })
    .finally(() => {
        mongoose.disconnect();
    })