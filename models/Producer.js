const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    Gender: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    Bio: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producer', producerSchema);
