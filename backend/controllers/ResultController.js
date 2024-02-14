// ResultsController.js

const Result = require('../models/Result');
const Match = require('../models/Match');

exports.createResult = async (req, res) => {
  const { matchId, scoreTeamOne, scoreTeamTwo, teamOneIds, teamTwoIds } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé' });
    }

    const winnerTeam = scoreTeamOne > scoreTeamTwo ? teamOneIds : teamTwoIds;

    const newResult = new Result({
      match: matchId,
      score: { teamOne: scoreTeamOne, teamTwo: scoreTeamTwo },
      winner: winnerTeam
    });

    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du résultat' });
  }
};

exports.getResult = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('match')
      .populate('winner', 'firstName lastName rating'); // Modifier pour inclure les champs souhaités de l'utilisateur

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des résultats' });
  }
};
