import express from "express";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// GET user dashboard
// GET user dashboard
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Get all registrations for this user
    const registrations = await Registration.find({ user: userId })
      .populate("event");

    const today = new Date();

    let upcoming = [];
    let past = [];

    registrations.forEach((reg) => {
      if (!reg.event) return;

      if (new Date(reg.event.date) >= today) {
        upcoming.push(reg.event);
      } else {
        past.push(reg.event);
      }
    });

    res.status(200).json({
      summary: {
        totalRegistered: registrations.length,
        upcomingCount: upcoming.length,
        pastCount: past.length,
      },
      upcoming,
      past,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
