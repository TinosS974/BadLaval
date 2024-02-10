const User = require('../models/User'); // Assurez-vous que le chemin d'accès est correct
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json({ message: 'Authentifié avec succès' });
    });
  })(req, res, next);
};
