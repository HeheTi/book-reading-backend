const { Schema, model } = require('mongoose');
const { mongooseHandleError } = require('../helpers');
const Joi = require('joi');

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
      minLength: 6,
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

const registrationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Repeat password must match the password field',
  }),
});

const schemas = { registrationSchema };

module.exports = { User, schemas };
