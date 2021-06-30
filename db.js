const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/creek-finder'


const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Conectado correctamente a la db ${name} en ${host}`);
    } catch (error) {
        console.log('Ha ocurrido un error conectando a la base de datos. ', error);
    }
};
module.exports = {
    DB_URL,
    connect,
};

