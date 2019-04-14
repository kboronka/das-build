import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/database';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findeOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  console.log('newUser', newUser);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}