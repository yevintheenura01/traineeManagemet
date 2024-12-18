const express = require('express');
const router = express.Router();
const traineeController = require('../Controllers/TraineeController');

router.post('/', traineeController.addTrainee);
router.get('/', traineeController.getTrainees);

module.exports = router;