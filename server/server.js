import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authenticateToken from "./middleware/authenticateToken.js";
import eventRoutes from "./routes/eventRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";



dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);



// app.get("/api/protected", authenticateToken, (req, res) => {
//   res.json({
//     message: "You are authorized",
//     userId: req.userId,
//   });
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
