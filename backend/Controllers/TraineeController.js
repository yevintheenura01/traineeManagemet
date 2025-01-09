const Trainee = require('../Models/TraineeModel');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv'); // Library to convert JSON to CSV
const bcrypt = require('bcrypt');

// Add Trainee
const addTrainee = async (req, res) => {
    try {
        const lastTrainee = await Trainee.findOne().sort({ _id: -1 }); // Sort by _id descending
        const newId = lastTrainee
            ? `T${String(parseInt(lastTrainee._id.substring(1)) + 1).padStart(3, '0')}`
            : 'T001'; // Start from T001 if no trainees exist

        const { password, ...traineeData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const trainee = new Trainee({ _id: newId, ...traineeData, password: hashedPassword });
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

// Get Trainee by ID
const getTraineeById = async (req, res) => {
    try {
        const { id } = req.params;
        const trainee = await Trainee.findById(id);
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        res.status(200).json(trainee);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching trainee', error: error.message });
    }
};

// Delete Trainee
const deleteTrainee = async (req, res) => {
    try {
        const { id } = req.params;
        const trainee = await Trainee.findByIdAndDelete(id);
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        res.status(200).json({ message: 'Trainee deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting trainee', error: error.message });
    }
};



// Update Trainee
const updateTrainee = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...traineeData } = req.body;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            traineeData.password = hashedPassword;
        }
        const updatedTrainee = await Trainee.findByIdAndUpdate(id, traineeData, { new: true });
        res.status(200).json({
            message: 'Trainee updated successfully',
            trainee: updatedTrainee,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating trainee', error: error.message });
    }
};



// Export all trainees to CSV
const exportAllTrainees = async (req, res) => {
    try {
        const trainees = await Trainee.find();
        const fields = ['id','firstName' ,'lastName', 'mobile', 'nic', 'email', 'mobile', 'address', 'trainingStartDate', 'trainingEndDate', 'institute', 'languages', 'specializations', 'supervisor', 'assignedWork', 'targetDate' ]; 
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
        
        const fields = ['id', 'firstName', 'email', 'mobile', 'address', 'trainingEndDate']; // Customize the fields
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

const getDashboardData = async (req, res) => {
    try {
      const totalTrainees = await Trainee.countDocuments();
      const categories = await Trainee.aggregate([
        { $unwind: "$specializations" },
        {
          $group: {
            _id: "$specializations",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } }, // Sort by count in descending order
      ]);
  
      res.status(200).json({ totalTrainees, categories });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
  };
  

exports.getDashboardData = getDashboardData; 
exports.addTrainee = addTrainee;
exports.getTrainees = getTrainees;
exports.exportAllTrainees = exportAllTrainees;
exports.exportActiveTrainees = exportActiveTrainees;
exports.deleteTrainee = deleteTrainee;
exports.updateTrainee = updateTrainee;
exports.getTraineeById = getTraineeById;