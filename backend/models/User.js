const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
