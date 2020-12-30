const Movie = require('../models/Movie');

//Get All Movies
exports.getAllMovies = (req, res) => {
  let query = Movie.find({});
  query
    .populate('Actors', 'Name')
    .populate('Producer', 'Name')
    .exec((err, movies) => {
      if (!movies || err) {
        return res.status(200).json({
          statusMessage: 'Error while fetching movies list',
          success: false,
          error: err,
        });
      }
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: movies });
    });
};

//Save Movie Details
exports.postMovieDetails = (req, res) => {
  const movie = new Movie(req.body);
  movie.save((err) => {
    if (err) {
      return res.status(200).json({
        statusMessage: 'Error while saving movie details',
        success: false,
        error: err,
      });
    } else {
      message = 'Movie details saved successfully';
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: message });
    }
  });
};

//Get Movie Details By Id
exports.getMovieById = (req, res) => {
  Movie.find({ _id: req.params.id }, (err, movie) => {
    if (!movie || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching movie details',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: movie });
    }
  });
};
