const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  score: {
    teamOne: Number,
    teamTwo: Number
  },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
