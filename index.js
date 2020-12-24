const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get("port");

// connecting to database
(function() {
    mongoose.connect(config.get("MongoURL"), { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.log("Server error", error.message);
        process.exit(1);
    });
})();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/cars", require("./routes/car-data.routes"));
