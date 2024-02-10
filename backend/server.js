const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('./models/User'); // Votre modèle Mongoose pour les utilisateurs
// Autres modèles pour les matchs, etc.

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration de la session
app.use(session({
  secret: 'secret', // Vous devriez utiliser une chaîne aléatoire complexe ici
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configuration de la stratégie Passport
passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Utilisateur non trouvé' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

// Sérialisation et désérialisation de l'utilisateur
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Impossible de se connecter à MongoDB', err));

// Routes pour l'authentification, les matchs, etc.
// ...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});