const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000
// Init Express

app.use(cors());
app.use(express.json());

//Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ozce2300:oAfqRLoW5sUpOUl9@arbets.kqv3qks.mongodb.net/?retryWrites=true&w=majority&appName=Arbets").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

// Skapa ett db-schema
const newSchema = mongoose.Schema({
    companyName: String,
    jobtitle: String,
    location: String,
    description: String
});

// Skapa en model
const cv = mongoose.model('cv', newSchema)

// Skapa en ny kurs
async function createCv() {
    //objekt som representerar kurs
    let cv1 = {
        companyName: "Volvo",
        jobtitle: "Produktionsledare",
        location: "Göteborg",
        description: "Ledare för montörer"
    };

    try {
        await cv.create(cv1);
    } catch (error) {
        return "There was an error: " + error;
    }
}

// Läs ut från databasen
async function getCv() {
    try {
        let result = await cv.find();

        console.log(result);
    } catch (error) {
        return "There was an error: " + error;
    }
}

// köra metoder
createCv();
getCv();