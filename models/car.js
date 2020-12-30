const { Schema, model } = require("mongoose");

const carSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: false
    }
});

const Car = model("Car", carSchema);
module.exports = Car;
