const Producer = require('../models/Producer');

//Get All Producer Details
exports.getAllProducers = (req, res) => {
  Producer.find({}, (err, producers) => {
    if (!producers || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching producers list',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: producers });
    }
  });
};

//Get Producer Details By Id
exports.getProducerById = (req, res) => {
  Producer.find({ _id: req.params.id }, (err, producer) => {
    if (!producer || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching producer details',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: producer });
    }
  });
};

//Get All Producer Names and Populate Dropdown
exports.getAllProducerNames = (req, res) => {
  let query = Producer.find({}).select('Name');
  query.exec((err, producers) => {
    if (!producers || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching dropdown list',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: producers });
    }
  });
};

//Save Producer's Details
exports.postProducerDetails = (req, res) => {
  const producer = new Producer(req.body);
  producer.save((err, message) => {
    if (err) {
      return res.status(200).json({
        statusMessage: 'Error while saving producer details',
        success: false,
        error: err,
      });
    } else {
      message = 'Producer details saved successfully';
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: message });
    }
  });
};
