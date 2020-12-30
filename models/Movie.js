const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    YearOfRelease: {
      type: String,
    },
    Poster: {
      type: String,
    },
    Plot: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    Producer: {
      type: ObjectId,
      ref: 'Producer',
    },
    Actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
