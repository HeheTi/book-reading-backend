const { Schema, model } = require('mongoose');
const { mongooseHandleError } = require('../helpers');

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 50,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      minLength: 5,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      minLength: 5,
      maxLength: 50,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
  }
);

userSchema.post('save', mongooseHandleError);

const User = model('user', userSchema);

module.exports = User;
