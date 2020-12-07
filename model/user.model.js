const { Schema, model } = require('mongoose')

const User = new Schema({
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  role: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = model('user', User, 'user')