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
    companyname: {
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

//routes

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
});

// Uppdatera CV
app.put("/cvs/:id", async (req, res) => {
    try {
        const updatedCv = await cv.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCv) {
            return res.status(404).json({ message: "CV hittades inte" });
        }
        return res.json(updatedCv);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Ta bort CV
app.delete("/cvs/:id", async (req, res) => {
    try {
        const deletedCv = await cv.findByIdAndDelete(req.params.id);
        if (!deletedCv) {
            return res.status(404).json({ message: "CV hittades inte" });
        }
        return res.json({ message: "CV borttagen" });
    } catch (error) {
        return res.status(500).json(error);
    }
});


//Lyssna
app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
