const mongoose = require('mongoose');

const Creek = require('../models/Creek');
const db = require('../db');

const creekSeed = [
  {
    name: 'Santo Tomas',
    img: ['https://www.cometemenorca.com/static/uploads/esbruc-sant-tomas-comete-menorca-playa.jpg'],
    lat: 39.91333,
    lng: 4.0421,
  },
  {
    name: 'Cala Turqueta',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-turqueta-menorca.jpg'],
    lat: 39.93207,
    lng: 3.91495,
  },
  {
    name: 'Cala Macarella',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-macarella.jpg'],
    lat: 39.936196499999994,
    lng: 3.9333940114311083,
  },
  {
    name: 'Cala Galdana',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-galdana.jpg'],
    lat: 39.93702057615642,
    lng: 3.960738703558726,
  },
  {
    name: 'Cala Pregonda',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-galdana.jpg'],
    lat: 40.05613022268097,
    lng: 4.0420949622722615,
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
    console.log('We couldn´t insert the Creeks seed to the data base');
  })
  .finally(() => {
    mongoose.disconnect();
  });
