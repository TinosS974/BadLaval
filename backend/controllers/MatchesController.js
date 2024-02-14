const Match = require('../models/Match');
const User = require('../models/User');

// Fonction pour générer des paires de joueurs uniques
function generateUniquePairs(players) {
    let rounds = []; // Contiendra les rondes de matchs
    const playerCount = players.length;
    
    // Assurez-vous que le nombre de joueurs est pair
    if (playerCount % 2 !== 0) {
      console.log("Le nombre de joueurs doit être pair.");
      return;
    }
  
    for (let round = 0; round < playerCount - 1; round++) {
      let roundPairs = [];
      
      for (let i = 0; i < playerCount / 2; i++) {
        let pair = [players[i], players[playerCount - 1 - i]];
        roundPairs.push(pair);
      }
      
      // Ajoutez les paires de cette ronde aux rondes
      rounds.push(roundPairs);
      
      // Faites tourner les joueurs pour la prochaine ronde, sauf le premier joueur
      players.splice(1, 0, players.pop());
    }
  
    return rounds;
  }
  
  // Exemple d'utilisation avec 16 joueurs
  let players = ['Joueur1', 'Joueur2', 'Joueur3', 'Joueur4', 'Joueur5', 'Joueur6', 'Joueur7', 'Joueur8',
                 'Joueur9', 'Joueur10', 'Joueur11', 'Joueur12', 'Joueur13', 'Joueur14', 'Joueur15', 'Joueur16'];
  let pairs = generateUniquePairs(players);
  console.log(pairs);
  

exports.createMatchesForSession = async (req, res) => {
  try {
    const players = await User.find({ eligible: true }).select('_id');

    // Transforme les documents utilisateur en un tableau d'IDs
    const playerIds = players.map(player => player._id);

    // Génère des paires d'IDs de joueurs
    const pairs = generateUniquePairs(playerIds);

    // Associer les paires à des matchs sur les 3 terrains disponibles
    const matches = pairs.map((pair, index) => {
      return new Match({
        teamOne: pair[0],
        teamTwo: pair[1],
        court: (index % 3) + 1 // Attribuer les terrains 1, 2, et 3 successivement
      });
    });

    // Sauvegarder tous les matchs créés
    for (const match of matches) {
      await match.save();
    }

    res.status(201).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création des matchs' });
  }
};
