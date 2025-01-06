const Trainee = require('../Models/TraineeModel');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv'); // Library to convert JSON to CSV

// Add Trainee
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

// Get all trainees
const getTrainees = async (req, res) => {
    try {
        const trainees = await Trainee.find();
        res.status(200).json(trainees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Export all trainees to CSV
const exportAllTrainees = async (req, res) => {
    try {
        const trainees = await Trainee.find();
        const fields = ['id', 'name', 'mobile', 'nic', 'email', 'mobile', 'address', 'trainingStartDate', 'trainingEndDate', 'institute', 'languages', 'specializations', 'supervisor', 'assignedWork', 'targetDate' ]; 
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(trainees);

        const filePath = path.join(__dirname, 'F:\SLT\newCRUD');
        fs.writeFileSync(filePath, csv);

        res.download(filePath, 'all_trainees.csv', (err) => {
            if (err) {
                throw err;
            }
            // Clean up file after download
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error exporting trainees', error: error.message });
    }
};

// Export active trainees to CSV
const exportActiveTrainees = async (req, res) => {
    try {
        const currentDate = new Date();
        // Fetch trainees whose trainingEndDate is on or after the current date
        const activeTrainees = await Trainee.find({
            trainingEndDate: { $gte: currentDate.toISOString() }
        });
        
        const fields = ['id', 'name', 'email', 'mobile', 'address', 'trainingEndDate']; // Customize the fields
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(activeTrainees);

        const filePath = path.join(__dirname, 'F:\SLT\newCRUD');
        fs.writeFileSync(filePath, csv);

        res.download(filePath, 'active_trainees.csv', (err) => {
            if (err) {
                throw err;
            }
            // Clean up file after download
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error exporting active trainees', error: error.message });
    }
};

exports.addTrainee = addTrainee;
exports.getTrainees = getTrainees;
exports.exportAllTrainees = exportAllTrainees;
exports.exportActiveTrainees = exportActiveTrainees;
