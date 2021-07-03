const mongoose = require('mongoose');

const Creek = require('../models/Creek');
const db = require('../db');

const creekSeed = [
  {
    name: 'Santo Tomas',
    img: ['https://www.cometemenorca.com/static/uploads/esbruc-sant-tomas-comete-menorca-playa.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Situada en la población de Es Migjorn Gran, la Playa de Santo Tomás forma parte de un gran entrante de mar en forma de "u" que continúa con las playas de San Adeodato y Binigaus.',
    lat: 39.91333,
    lng: 4.0421,
  },
  {
    name: 'Cala Turqueta',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-turqueta-menorca.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description: 'Cala de arena blanca, con una torre para socorristas y un bosque de pinos rodeandola',
    lat: 39.93207,
    lng: 3.91495,
  },
  {
    name: 'Cala Macarella',
    img: [
      'https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-macarella.jpg',
      'https://aws.traveler.es/prod/designs/v1/assets/745x559/126856.jpg',
      'https://calamacarella.es/wp-content/uploads/2021/03/GOPR4511_1600282049131-1024x768.jpg',
    ],
    province: 'Islas Baleares',
    type: 'arena',
    description: 'Cala amplia de arena blanca, rodeada por un bosque de pinos y camino en los acantilados adyacientes',
    lat: 39.936196499999994,
    lng: 3.9333940114311083,
  },
  {
    name: 'Cala Galdana',
    img: ['https://cdn2.civitatis.com/espana/menorca/galeria/big/cala-galdana.jpg'],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Cala de arena blanca y con un gran hotel justo detras, cuenta con un amplio parking para dejar el coche. Conectada con "Camí de Cavalls" para hacer rutas a otras playas cercanas',
    lat: 39.93702057615642,
    lng: 3.960738703558726,
  },
  {
    name: 'Cala Pregonda',
    img: [
      'https://playasbaleares.s3.fr-par.scw.cloud/2020/09/pregonda5.jpg',
      'http://d3e1m60ptf1oym.cloudfront.net/9d1b7cbe-8c8b-4c5b-82bb-5d0cc7eb9eaa/M41150-Pano-FR-01_xgaplus.jpg',
      'https://viajes.chavetas.es/wp-content/uploads/2016/12/cala-pregonda-destacada.jpg',
    ],
    province: 'Islas Baleares',
    type: 'arena',
    description:
      'Cala de arena rojiza debido a la concentracion de arcilla. Fabuloso contraste de la arena con el azul claro del agua. De las mejores playas de Menorca, de hecho, cuenta con el privilejio de ser la portada de uno de los discos de Mike Oldfield ',
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
