const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const methodoverride = require('method-override');

const db = require('./db');
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

require('./auth/register');
require('./auth/login');

const indexRoutes = require('./routes/index.routes');
const creekRoutes = require('./routes/creek.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const commentRoutes = require('./routes/comment.routes');

const PORT = process.env.PORT || 3500;

dotenv.config();
db.connect();

const server = express();

server.use(methodoverride('_method'));
server.use(
  session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use(
  cors({
    origin: ['http://localhost:3500', 'http://localhost:3000'],
    credentials: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', indexRoutes);
server.use('/creeks', creekRoutes);
server.use('/users', userRoutes);
server.use('/auth', authRoutes);
server.use('/comments', commentRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Page not found');
  return res.status(404).json(error);
});

server.use((error, req, res, next) => {
  console.log('error--> ', error.message);
  return res.status(error.status || 500).json(error.message);
});

server.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
