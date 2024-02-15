const Match = require('../models/Match');
const User = require('../models/User');

function generateUniquePairs(playerIds) {
    let rounds = [];
    const playerCount = playerIds.length;
    
    if (playerCount % 2 !== 0) {
        console.log("Le nombre de joueurs doit être pair.");
        return [];
    }
  
    let ids = [...playerIds];
  
    for (let round = 0; round < playerCount - 1; round++) {
        let roundPairs = [];
      
        for (let i = 0; i < playerCount / 2; i++) {
            let pair = [ids[i], ids[playerCount - 1 - i]];
            roundPairs.push(pair);
        }
      
        rounds.push(roundPairs);
        ids.splice(1, 0, ids.pop());
    }
  
    return rounds;
}

exports.createMatchesForSession = async (req, res) => {
    console.log('Requête reçue pour créer des matchs de session');
    try {
        const players = await User.find({}).select('firstName _id');

        const playerIds = players.map(player => player._id);
        const rounds = generateUniquePairs(playerIds);

        const sessionDate = req.body.date || new Date();
        let matches = [];
        let courtAssignment = 1;

        for (let i = 0; i < 30; i++) {
            if (i % 10 === 0 && i !== 0) courtAssignment++; // Change court after every 10 matches
            const roundIndex = i % rounds.length;
            const pairIndex = Math.floor(i / rounds.length) % rounds[0].length;
            const pair = rounds[roundIndex][pairIndex];

            let match = new Match({
                teamOne: [pair[0]],
                teamTwo: [pair[1]],
                court: courtAssignment,
                date: sessionDate
            });

            match.teamOnePlayers = [players.find(player => player._id.equals(pair[0])).firstName];
            match.teamTwoPlayers = [players.find(player => player._id.equals(pair[1])).firstName];

            matches.push(match);
        }

        console.log('Matchs à sauvegarder :', matches);
        
        await Match.insertMany(matches.map(match => ({
            teamOne: match.teamOne,
            teamTwo: match.teamTwo,
            court: match.court,
            date: match.date
        })));

        res.status(201).json(matches.map(match => ({
            teamOne: match.teamOnePlayers,
            teamTwo: match.teamTwoPlayers,
            court: match.court,
            date: match.date
        })));
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création des matchs', error });
    }
};
