const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);

// MongoDB Connection
const db = "mongodb://localhost:27017/Form-registrations";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Error while connecting to database", err);
    });

// Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
});
