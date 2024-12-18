const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const TraineeRoute = require('./Routes/TraineeRoute');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/trainees', TraineeRoute);


// MongoDB connection
mongoose
  .connect(mongoUri)
      .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

