const mongoose = require("mongoose");

const Creek = require("../models/Creek");
const db = require("../db");

const creekSeed = [
  {
    name: "Cala Santo Tomas",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625420315/seed/santo-tomas_1_cqecfr.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      'Situada en la población de Es Migjorn Gran, la Playa de Santo Tomás forma parte de un gran entrante de mar en forma de "u" que continúa con las playas de San Adeodato y Binigaus.',
    lat: 39.91333,
    lng: 4.0421,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Turqueta",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625420560/seed/cala-turqueta-menorca_j7lucp.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description: "Cala de arena blanca, con una torre para socorristas y un bosque de pinos rodeandola",
    lat: 39.93207,
    lng: 3.91495,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Macarella",
    img: [
      "https://res.cloudinary.com/creek-finder/image/upload/v1625420877/seed/macarella3_hcycxg.jpg",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625420803/seed/cala-macarella_xsjchc.webp",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625420839/seed/macarella_gtzdtx.jpg",
    ],
    province: "Islas Baleares",
    type: "arena",
    description: "Cala amplia de arena blanca, rodeada por un bosque de pinos y camino en los acantilados adyacientes",
    lat: 39.936196499999994,
    lng: 3.9333940114311083,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Galdana",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625420910/seed/cala-galdana_afab1f.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      'Cala de arena blanca y con un gran hotel justo detras, cuenta con un amplio parking para dejar el coche. Conectada con "Camí de Cavalls" para hacer rutas a otras playas cercanas',
    lat: 39.93702057615642,
    lng: 3.960738703558726,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Pregonda",
    img: [
      "https://res.cloudinary.com/creek-finder/image/upload/v1625420973/seed/pregonda-5_nzt9e9.jpg",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625421011/seed/pregonda-1_txsxn1.jpg",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625421049/seed/pregonda7_qzpttg.jpg",
    ],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Cala de arena rojiza debido a la concentracion de arcilla. Fabuloso contraste de la arena con el azul claro del agua. De las mejores playas de Menorca, de hecho, cuenta con el privilejio de ser la portada de uno de los discos de Mike Oldfield ",
    lat: 40.05613022268097,
    lng: 4.0420949622722615,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Mitjana",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625435862/seed/cala-mitjana-menorca_buh4yx.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "La playa de Mitjana es una de las magníficas playas del sur de Menorca. Situada cerca de Cala Galdana, esta cala virgen es accesible para todo el mundo.",
    lat: 39.9337621,
    lng: 3.9705993,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Macarelleta",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625436201/seed/cala-macarelleta_jy57ji.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Cala Macarelleta es una de las calas con mayor número de nudistas en Menorca. Se encuentra situada en la misma bahía que Cala Macarella y está bañada por las mismas aguas cristalinas de color turquesa.",
    lat: 39.9361676,
    lng: 3.9347745,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala en porter",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625436388/seed/cala-en-porter_wyicnn.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Su emplazamiento entre grandes acantilados, su agua azul y su arena blanca, hacen de Cala en Porter una de las calas más fascinantes de Menorca.",
    lat: 39.8708358,
    lng: 4.1319861,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala'n Bosch",
    img: [
      "https://res.cloudinary.com/creek-finder/image/upload/v1625436767/seed/Cala_n_Bosch_hlvptg.jpg",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625436507/seed/calan-bosch_bgvbds.jpg",
    ],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Cala'n Bosch es una de las calas más cercanas a Ciudadela y se encuentra al suroeste de Menorca. Está totalmente urbanizada pero la arena y sus aguas cristalinas la convierten en una de las mejores.",
    lat: 39.9261534,
    lng: 3.8373506,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Es Talaier",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625436955/seed/es-talaier_eisedz.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Es Talaier es una playa virgen del sur de Ciudadela, con aguas turquesas y arena blanca. Aunque es bastante pequeña, en verano suele estar llena de turistas.",
    lat: 39.9267345,
    lng: 3.9027457,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala de Algaiarens (La Vall)",
    img: [
      "https://res.cloudinary.com/creek-finder/image/upload/v1625437272/seed/Algaiarens-La-Vall-DJI_1216_ymbqln.webp",
      "https://res.cloudinary.com/creek-finder/image/upload/v1625437116/seed/la-vall-acantilado_vbwnwr.jpg",
    ],
    province: "Islas Baleares",
    type: "arena",
    description:
      "La Vall es una de las calas de la costa norte de Menorca más cercanas a Ciudadela. Se encuentra a escasa distancia de Cala Morell, cuya necrópolis ofrece un lugar interesante para terminar un día de playa.",
    lat: 40.0461637,
    lng: 3.9216889,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Morell",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625437437/seed/calaMorell_g5v7zi.jpg"],
    province: "Islas Baleares",
    type: "rocas",
    description:
      "Cala Morell es una cala localizada en el norte de Menorca. Mide 80 metros de largo y unos 50 de ancho y está rodeada por acantilados con rocas peculiares, dotándola de un atractivo especial desde el punto de vista paisajístico.",
    lat: 40.0536351,
    lng: 3.882334,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Son Saura",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625437634/seed/son-saura_uejcbw.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Son Saura es una de las playas vírgenes más famosas de la costa sur de Menorca. Es una playa grande, dividida en dos mitades, que cuenta con servicios de parking y socorrista.",
    lat: 39.9278191,
    lng: 3.8921703,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Cala Blanca",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625437800/seed/cala-blanca_gt1buo.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Cala Blanca es una pequeña cala muy cercana a Ciudadela, al oeste de Menorca. Está situada en la urbanización con el mismo nombre.",
    lat: 39.967747,
    lng: 3.8356216,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Playa de Son Bou",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625437945/seed/son-bou-menorca_rwheez.jpg"],
    province: "Islas Baleares",
    type: "arena",
    description:
      "Son Bou es la playa más grande de Menorca. Esta playa ofrece casi dos kilómetros y medio de arena dorada donde poder disfrutar.",
    lat: 39.8994316,
    lng: 4.0722933,
    timesFavourite: 0,
    comments: [],
  },
  {
    name: "Playa de Santo Tomás",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625439839/seed/Santo-Tomas-scaled_nr4bwe.webp"],
    province: "Islas Baleares",
    type: "arena",
    description:
      'Situada en la población de Es Migjorn Gran, la Playa de Santo Tomás forma parte de un gran entrante de mar en forma de "u" que continúa con las playas de San Adeodato y Binigaus.',
    lat: 39.9138138,
    lng: 4.0412482,
    timesFavourite: 0,
    comments: [],
  },

  //Alicante

  {
    name: "Playa de la Granadella",
    img: ["https://res.cloudinary.com/creek-finder/image/upload/v1625910275/seed/Cala-de-la-Granadella-1_obihdr.jpg"],
    province: "Alicante",
    type: "cantos rodados",
    description:
      "La playa de la Granadella es una playa de grava que se sitúa en la cala del mismo nombre del municipio de Jávea en la provincia de Alicante,.",
    lat: 38.72957,
    lng: 0.197,
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
    console.log("We couldn´t insert the Creeks seed to the data base");
  })
  .finally(() => {
    mongoose.disconnect();
  });
