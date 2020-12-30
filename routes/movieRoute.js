const express = require('express');
const router = express.Router();

const {
  getAllMovies,
  postMovieDetails,
  getMovieById,
} = require('../controllers/movieController');

router.get('/all', getAllMovies);

router.post('/new', postMovieDetails);

router.get('/id=:id', getMovieById);

module.exports = router;
