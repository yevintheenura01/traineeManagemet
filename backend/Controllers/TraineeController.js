const Trainee = require('../Models/TraineeModel');

const addTrainee = async (req, res) => {
    try {
        const trainee = new Trainee(req.body);
        await trainee.save();
        res.status(201).json({
            message: 'Trainee added successfully',
            trainee,
        });
    } catch (error) {
        res.status(400).json({ 
            message: "Trainee could not be added",
            error: error.message
        });
    }
};

const getTrainees = async (req, res) => {
    try {
        const trainees = await Trainee.find();
        res.status(200).json(trainees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addTrainee = addTrainee;
exports.getTrainees = getTrainees;