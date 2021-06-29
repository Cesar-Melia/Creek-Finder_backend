const mongoose = require('mongoose');

const User = require('../models/Creek');
const db = require('../db');

const userSeed = [
    {
        userName: 'Admin',
        password: '1234Asdf',
        email: 'admin@email.com',
        role: 'admin'
    },
    {
        userName: 'User',
        password: '1234Asdf',
        email: 'user@email.com',
        role: 'user'
    },
    {
        userName: 'Creator',
        password: '1234Asdf',
        email: 'creator@email.com',
        role: 'creator'
    }
]

mongoose.connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allUsers = await User.find();
        if (allUsers.length) {
            await User.collection.drop();
        }
    })
    .then(async () => {
        await User.insertMany(userSeed);
    })
    .catch((error) => {
        console.log('We couldn´t insert the Users seed to the data base')
    })
    .finally(() => {
        mongoose.disconnect();
    })