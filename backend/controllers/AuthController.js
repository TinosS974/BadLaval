const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Module intégré pour la génération d'un mot de passe aléatoire

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

exports.getUsersInfos = async (req, res) => {
  try {
    // Select only the firstName, lastName, and rating fields from the User model
    const users = await User.find({}).select('firstName lastName rating');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

exports.createUser = async (req, res) => {
  const { email, firstName, lastName, isAdmin } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const randomPassword = crypto.randomBytes(8).toString('hex');

    const hashedPassword = await bcrypt.hash(randomPassword, 12);
    user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin
    });

    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

