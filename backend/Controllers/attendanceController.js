
const Attendance = require('../Models/Attendance');


const submitAttendance = async (req, res) => {
  const { name, date, arrivalTime, departureTime, section, group } = req.body;

  try {
    const newAttendance = new Attendance({
      name,
      date,
      arrivalTime,
      departureTime,
      section,
      group,
      status: 'pending', // Default status is 'pending'
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance submitted successfully!' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ message: 'Error submitting attendance, please try again later.' });
  }
};

module.exports = { submitAttendance };
