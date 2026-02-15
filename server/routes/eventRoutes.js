import express from "express";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// GET all events with filtering & pagination
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      category,
      location,
      page = 1,
      limit = 6,
    } = req.query;

    // Build query object
    let query = {};

    // Search by event name (case insensitive)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query.location = location;
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ date: 1 }) // upcoming first
      .skip(skip)
      .limit(Number(limit));

    const total = await Event.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register for an event
router.post("/:id/register", authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if seats available
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Create registration
    await Registration.create({
      user: userId,
      event: eventId,
    });

    // Decrease available seats
    event.availableSeats -= 1;
    await event.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Cancel registration
router.delete("/:id/register", authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.userId;

    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (!registration) {
      return res.status(400).json({ message: "Not registered for this event" });
    }

    // Delete registration
    await registration.deleteOne();

    // Increase available seats
    const event = await Event.findById(eventId);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    res.status(200).json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
