require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const router = require("../router/auth-router");
const connectDB = require("../utility/db");
const errorMiddleware = require('../middleware/error-middleware');


// Middleware
const corsOptions = {
  origin: "https://pujamoneycollection.vercel.app", // React frontend
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ fixed
app.use(express.json()); // handles application/json
app.use(express.urlencoded({ extended: true })); // handles form-urlencoded

// Routes
app.use("/api/auth", router);

// Error middleware
app.use(errorMiddleware);

// // DB connection + start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server running at http://localhost:${PORT}`);
//   });
// });

// Health check endpoint
app.get('/api/auth', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Connect to database and export the app
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
