const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const db = require('./src/config/dbconfig');

// Config
app.use(express.json());
dotenv.config();

// Routes
const usersRoute = require('./src/api/routes/user');

// Middleware
app.use('/users', usersRoute);

//Connecting to our locally running instance of MongoDB
db.connectDB();

//Open a connection to the local database
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})