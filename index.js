const express = require('express');

const router = express.Router();

const PORT = 3500;

const server = express();



server.listen(PORT, () => console.log(`Server listening in port ${PORT}`))