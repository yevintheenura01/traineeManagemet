
const express = require('express');
const { submitAttendance } = require('../Controllers/attendanceController');
const router = express.Router();

router.post('/submit-attendance', submitAttendance);

module.exports = router;
