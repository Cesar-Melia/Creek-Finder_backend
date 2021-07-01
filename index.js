const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const db = require('./db');
const router = express.Router();
const passport = require('passport');

require('./auth');

const indexRoutes = require('./routes/index.routes');
const creekRoutes = require('./routes/creek.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

db.connect();

const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3500'],
    credentials: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

server.use('/', indexRoutes);
server.use('/creeks', creekRoutes);
server.use('/users', userRoutes);
server.use('/auth', authRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Page not found');
  return res.status(404).json(error);
});

server.use((error, req, res, next) => {
  console.log('error--> ', error.message);
  return res.status(error.status || 500).json(error);
});

server.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
