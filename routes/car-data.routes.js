const { Router } = require("express");
const Car = require("../models/Car");

const router = Router();

// /api/cars/add-car
router.post("/add-car", async (req, res) => {
  try {
    const { owner, model, mark, year } = req.body;
    const car = new Car({ owner, mark, model, year });

    await car.save();
    res.status(201).json({ message: "Car has been added to database" });
  }
  catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/cars/getAll
router.get("/getAll", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  }
  catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/cars/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Car.deleteOne({ _id: id });
    res.status(201).json({ message: "Car has been deleted from database" });
  }
  catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
