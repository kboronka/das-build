import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import createError from 'http-errors';

import issuesRouter from './routes/issues';
import usersRouter from './routes/users';
import config from './config/database';

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

mongoose.connect(config.uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log(`connected to ${config.uri}`);
});

connection.once('error', (err) => {
  console.log(`database error ${err}`);
});

app.use('/issues', issuesRouter);
app.use('/users', usersRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  var statusCode = err.status || 500;
  res.status(statusCode).json({ code: statusCode, message: err.message });
});

app.listen(port, () => console.log(`listening on port ${port}`));