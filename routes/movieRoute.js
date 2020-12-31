const express = require('express');
const router = express.Router();

const {
  getAllMovies,
  postMovieDetails,
  getMovieById,
  postMovieDetailsForId,
} = require('../controllers/movieController');

router.get('/all', getAllMovies);

router.post('/new', postMovieDetails);

router.get('/id=:id', getMovieById);

router.post('/id=:id', postMovieDetailsForId);

module.exports = router;
