const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    }
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
