import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import createError from 'http-errors';

import issuesRouter from './routes/issues';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully!')
});

app.use('/', router);
app.use('/issues', issuesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  var statusCode = err.status || 500;
  res.status(statusCode).json({ code: statusCode, message: err.message });
});

app.listen(4000, () => console.log("listening on port 4000"));