const Actor = require('../models/Actor');

//Get All Actor Details
exports.getAllActors = (req, res) => {
  Actor.find({}, (err, actors) => {
    if (!actors || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching actors list',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: actors });
    }
  });
};

//Get Actor Details By Id
exports.getActorById = (req, res) => {
  Actor.find({ _id: req.params.id }, (err, actor) => {
    if (!actor || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching actor details',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: actor });
    }
  });
};

//Get All Actor Names and Populate Dropdown
exports.getAllActorNames = (req, res) => {
  let query = Actor.find({}).select('Name');
  query.exec((err, actors) => {
    if (!actors || err) {
      return res.status(200).json({
        statusMessage: 'Error while fetching dropdown list',
        success: false,
      });
    } else {
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: actors });
    }
  });
};

//Save Actor's Details
exports.postActorDetails = (req, res) => {
  const actor = new Actor(req.body);
  actor.save((err, message) => {
    if (err) {
      return res.status(200).json({
        statusMessage: 'Error while saving actor details',
        success: false,
      });
    } else {
      message = 'Actor details saved successfully';
      return res
        .status(200)
        .json({ statusMessage: 'Success', success: true, data: message });
    }
  });
};
