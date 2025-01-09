const express = require('express');
const router = express.Router();
const traineeController = require('../Controllers/TraineeController');

router.get('/', traineeController.getTrainees);

router.post('/', traineeController.addTrainee);
router.put('/:id', traineeController.updateTrainee);
router.delete('/:id', traineeController.deleteTrainee);
router.get('/exportAll', traineeController.exportAllTrainees);
router.get('/exportActive', traineeController.exportActiveTrainees);
router.get('/dashboard', traineeController.getDashboardData);
router.get('/:id', traineeController.getTraineeById);

module.exports = router;