import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/user.model';

const router = express.Router();

// Register
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
      res.status(400);
      res.json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: 'user registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400);
      return res.json({ success: false, msg: 'user not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            admin: user.admin
          }
        });
      } else {
        res.status(400);
        res.json({ success: false, msg: 'wrong password' });
      }
    });
  });
});

// Profile
router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

router.post('/validate',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ agent: req.user });
  }
);

module.exports = router;