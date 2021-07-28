const mongoose = require('mongoose');

const User = require('../models/User');
const db = require('../db');

const userSeed = [
  {
    userName: 'Admin',
    password: '$2b$10$vt1AvGDHtnclBzaT.Ts7CuTHRN8lwvociAdk1/G31MWDoK9Mrsk1C',
    email: 'admin@email.com',
    role: 'admin',
    favorites: [],
    comments: [],
    img: 'https://res.cloudinary.com/creek-finder/image/upload/v1627470119/Users/admin_pmdkrm.jpg',
  },
  {
    userName: 'User',
    password: '$2b$10$vt1AvGDHtnclBzaT.Ts7CuTHRN8lwvociAdk1/G31MWDoK9Mrsk1C',
    email: 'user@email.com',
    role: 'user',
    favorites: [],
    comments: [],
    img: 'https://res.cloudinary.com/creek-finder/image/upload/v1625564708/Users/user_default_blue_zfil71.png',
  },
  {
    userName: 'Creator',
    password: '$2b$10$vt1AvGDHtnclBzaT.Ts7CuTHRN8lwvociAdk1/G31MWDoK9Mrsk1C',
    email: 'creator@email.com',
    role: 'creator',
    favorites: [],
    comments: [],
    img: 'https://res.cloudinary.com/creek-finder/image/upload/v1625564708/Users/user_default_blue_zfil71.png',
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const allUsers = await User.find();
    if (allUsers.length) {
      await User.collection.drop();
    }
  })
  .then(async () => {
    await User.insertMany(userSeed);
  })
  .catch(error => {
    console.log('We couldn´t insert the Users seed to the data base');
  })
  .finally(() => {
    mongoose.disconnect();
  });
