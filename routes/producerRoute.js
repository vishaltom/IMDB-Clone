const express = require('express');
const router = express.Router();

const {
  getAllProducers,
  getProducerById,
  getAllProducerNames,
  postProducerDetails,
} = require('../controllers/producerController');

router.get('/all', getAllProducers);

router.post('/new', postProducerDetails);

router.get('/id=:id', getProducerById);

router.get('/producerDropdown', getAllProducerNames);

module.exports = router;
