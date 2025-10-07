const mongoose = require('mongoose');
const URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDB;

