const express = require("express")
const cors = require("cors")


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/FO").then(() => {
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
    } catch(error) {
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