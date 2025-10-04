const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
  fireName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: Number,
  country: String,
  gender: String,
});

// Create model
const User = mongoose.model('customer', userSchema);

// Export model
module.exports = User;
