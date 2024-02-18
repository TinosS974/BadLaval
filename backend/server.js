const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const routes = require('./routes');
require('dotenv').config();


const User = require('./models/User'); // Votre modèle Mongoose pour les utilisateurs
// Autres modèles pour les matchs, etc.

const app = express();
const corsOptions = {
  origin: process.env.FRONT_URI, // Remplacez ceci par l'URL de votre front-end
  credentials: true, // Cela permettra d'envoyer des cookies de session
};

app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(express.json());

const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET, // Assurez-vous d'avoir défini SESSION_SECRET dans vos variables d'environnement
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
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

app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => console.error('Erreur de connexion à MongoDB Atlas', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
