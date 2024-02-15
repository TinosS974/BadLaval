const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamOne: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teamTwo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scoreTeamOne: { type: Number, default: 0 },
  scoreTeamTwo: { type: Number, default: 0 },
  averageRatingBeforeMatch: {type:  Number, default: 0 },
  court: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
