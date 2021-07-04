const mongoose = require('mongoose');

const Creek = require('../models/Creek');
const db = require('../db');

const creekSeed = [
  {
    name: 'Cala Santo Tomas',
    img: ['https://res.cloudinary.com/creek-finder/image/upload/v1625420315/seed/santo-tomas_1_cqecfr.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Situada en la población de Es Migjorn Gran, la Playa de Santo Tomás forma parte de un gran entrante de mar en forma de "u" que continúa con las playas de San Adeodato y Binigaus.',
    lat: 39.91333,
    lng: 4.0421,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: 'Cala Turqueta',
    img: ['https://res.cloudinary.com/creek-finder/image/upload/v1625420560/seed/cala-turqueta-menorca_j7lucp.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description: 'Cala de arena blanca, con una torre para socorristas y un bosque de pinos rodeandola',
    lat: 39.93207,
    lng: 3.91495,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: 'Cala Macarella',
    img: [
      'https://res.cloudinary.com/creek-finder/image/upload/v1625420877/seed/macarella3_hcycxg.jpg',
      'https://res.cloudinary.com/creek-finder/image/upload/v1625420803/seed/cala-macarella_xsjchc.webp',
      'https://res.cloudinary.com/creek-finder/image/upload/v1625420839/seed/macarella_gtzdtx.jpg',
    ],
    province: 'Islas Baleares',
    type: 'arena',
    description: 'Cala amplia de arena blanca, rodeada por un bosque de pinos y camino en los acantilados adyacientes',
    lat: 39.936196499999994,
    lng: 3.9333940114311083,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: 'Cala Galdana',
    img: ['https://res.cloudinary.com/creek-finder/image/upload/v1625420910/seed/cala-galdana_afab1f.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Cala de arena blanca y con un gran hotel justo detras, cuenta con un amplio parking para dejar el coche. Conectada con "Camí de Cavalls" para hacer rutas a otras playas cercanas',
    lat: 39.93702057615642,
    lng: 3.960738703558726,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: 'Cala Pregonda',
    img: [
      'https://res.cloudinary.com/creek-finder/image/upload/v1625420973/seed/pregonda-5_nzt9e9.jpg',
      'https://res.cloudinary.com/creek-finder/image/upload/v1625421011/seed/pregonda-1_txsxn1.jpg',
      'https://res.cloudinary.com/creek-finder/image/upload/v1625421049/seed/pregonda7_qzpttg.jpg',
    ],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Cala de arena rojiza debido a la concentracion de arcilla. Fabuloso contraste de la arena con el azul claro del agua. De las mejores playas de Menorca, de hecho, cuenta con el privilejio de ser la portada de uno de los discos de Mike Oldfield ',
    lat: 40.05613022268097,
    lng: 4.0420949622722615,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: 'Cala Galdana',
    img: ['https://res.cloudinary.com/creek-finder/image/upload/v1625420910/seed/cala-galdana_afab1f.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Cala de arena blanca y con un gran hotel justo detras, cuenta con un amplio parking para dejar el coche. Conectada con "Camí de Cavalls" para hacer rutas a otras playas cercanas',
    lat: 39.93702057615642,
    lng: 3.960738703558726,
    timesFavourite: 0,
    comments: [],
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
