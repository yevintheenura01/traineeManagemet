
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureTime: { type: String, required: true },
  section: { type: String, required: true },
  group: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
