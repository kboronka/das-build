import express from 'express';
import User from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

import Issue from '../models/Issue';

router.post('/register', (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'failed to rejister user' });
    } else {
      res.json({ success: true, msg: 'user registered' });
    }
  });
});

router.get('/authenticate', (req, res) => {
  res.send('authenticate');
});

router.get('/profile', (req, res) => {
  res.send('profile');
});

router.get('/validate', (req, res) => {
  res.send('validate');
});


module.exports = router;