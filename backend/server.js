import express from 'express';
import connectDB from './db.js'; // Note the .js extension for ES6 imports
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
