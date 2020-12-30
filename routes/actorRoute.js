const express = require('express');
const router = express.Router();

const {
  getAllActors,
  getActorById,
  getAllActorNames,
  postActorDetails,
} = require('../controllers/actorController');

router.get('/all', getAllActors);

router.post('/new', postActorDetails);

router.get('/actorDropdown', getAllActorNames);

router.get('/id=:id', getActorById);

module.exports = router;
