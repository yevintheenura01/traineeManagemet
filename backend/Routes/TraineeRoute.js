const express = require('express');
const router = express.Router();
const traineeController = require('../Controllers/TraineeController');

router.post('/', traineeController.addTrainee);
router.get('/', traineeController.getTrainees);
router.get('/exportAll', traineeController.exportAllTrainees);
router.get('/exportActive', traineeController.exportActiveTrainees);

module.exports = router;