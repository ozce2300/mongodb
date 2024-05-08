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
    companyName: {
        type: String,
        required : true
    },
    jobtitle: {
        type: String,
        required : true
    },
    location: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    }
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

//route

//Hämta cv
app.get("/cvs", async (req, res) => {
    try {
        let result = await cv.find({})

        return res.json(result)
    }
    catch (error) {
        return res.status(500).json(error)

    }


});

//Posta cv
app.post("/cvs", async (req, res) => {

    try {
        let result = await cv.create(req.body)

        return res.json(result)
    }
    catch (error) {
        return res.status(400).json(error)

    }

    let companyname = req.body.companyname
    let jobtitle = req.body.jobtitle
    let location = req.body.location
    let description = req.body.description
});

// Uppdatera ett CV
app.put("/cv/:id", (req, res) => {
    const id = req.params.id;

    let companyname = req.body.companyname
    let jobtitle = req.body.jobtitle
    let location = req.body.location
    let description = req.body.description
});

// Ta bort ett CV
app.delete("/cv/:id", (req, res) => {
    const id = req.params.id;

});


//Lyssna
app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
