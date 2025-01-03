const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");
// Importing routes
const courseRoutes = require('./routes/courseRoutes');
const professorRoutes = require('./routes/professorRoutes');
// Environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string

// Initialize Express
const app = express();


const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // If you need cookies or auth headers
};
app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application if the connection fails
  });

// Main route prefix
app.use('/v0', courseRoutes);

app.use('/v0', professorRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
