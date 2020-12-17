const express = require("express");
const mongoose = require("mongoose");
const Car = require("./models/car");
const { createFolder, createFile } = require("./fs/fs");

const app = express();

const PORT = process.env.PORT || 3000;

// connecting to database

(function() {
    const URL = "mongodb+srv://MorePositive:bEsrT8O1m2aUJW5M@cluster0.y2laz.mongodb.net/vehiclesDB?retryWrites=true&w=majority";
    mongoose.connect(URL, { 
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(error => console.log(error));
})();

// routes

app.get("/", () => console.log("Welcome to home page"));
app.get("/about", () => console.log("About page welcomes you"));
app.get("/contacts", () => console.log("You are on 'Contacts' page"));
app.get("/folder", () => createFolder());
app.get("/newfile", () => createFile());

app.get("/add-car", () => {
    const car = new Car({
        mark: "Mercedes",
        model: "C43AMG",
        year: 2017
    });
    car.save()
        .then(data => console.log("Car has been added to database"))
        .catch(error => console.log(error));
});

app.get("/cars", () => {
    Car.find()
        .then(data => console.log(data))
        .catch(error => console.log(error));
});

app.get("/car", () => {
    Car.findById("5fd9d6eb6702912f3c607b39")
        .then(data => console.log(data))
        .catch(error => console.log(error));
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Car.findOneAndDelete(id)
    .then(() => console.log(`car with id: ${id} has been deleted`))
    .catch((error) => console.log(error))
});
