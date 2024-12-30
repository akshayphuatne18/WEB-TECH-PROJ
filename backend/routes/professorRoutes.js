const express = require('express');
const router = express.Router();
const {
  signupProfessor,
  loginProfessor,
  getProfessorProfile,
} = require('../controllers/professorController');
const authenticate = require('../middlewares/authMiddleware');

// Route to sign up a new professor
router.post('/signup', signupProfessor);

// Route to log in an existing professor
router.post('/login', loginProfessor);

// Route to fetch the authenticated professor's profile
router.get('/profile', authenticate, getProfessorProfile);

module.exports = router;