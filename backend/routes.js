const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const MatchesController = require('./controllers/MatchesController');
const ResultController = require('./controllers/ResultController');


// Auth routes
router.post('/admin/register', AuthController.register);
router.post('/admin/login', AuthController.login);

// User routes
router.get('/users', AuthController.getUsersInfos);


// Match routes
router.post('/matches/session', MatchesController.createMatchesForSession);
router.get('/matches/today', MatchesController.getMatchesToday);

// Result routes
router.post('/results', ResultController.createResult);
router.get('/results', ResultController.getResult);

module.exports = router;
