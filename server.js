const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const statusesRoutes = require('./routes/statuses.routes');

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', postsRoutes);
app.use('/api', usersRoutes);
app.use('/api', statusesRoutes);

app.use('/api', (req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
let dbURI = '';

if (NODE_ENV === 'production') dbURI = 'mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@NAME.pjwrm.mongodb.net/?retryWrites=true&w=majority';
else if (NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/bulletinBoardDBtest';
else dbURI = 'mongodb://localhost:27017/bulletinBoardDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const port = process.env.PORT || '8000';
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

module.exports = server;