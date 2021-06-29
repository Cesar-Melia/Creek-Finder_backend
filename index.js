const express = require('express');
const db = require('./db');
const router = express.Router();

const indexRoutes = require('./routes/index.routes');
const creekRoutes = require('./routes/creek.routes');

const PORT = 3600;
db.connect();

const server = express();

server.use('/', indexRoutes);
server.use('/creeks', creekRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Page not found');
  return res.status(404).json(error);
});

server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error);
});

server.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
