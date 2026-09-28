const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const heritageRoutes = require("./routes/heritageRoutes");

// 1. Load environment variables FIRST before calling connectDB()
dotenv.config();

// 2. Now connect to the database (it can now safely read process.env.MONGO_URI)
connectDB();

const app = express();

// Only allow the local frontend dev server(s). Origins come from
// CLIENT_ORIGINS in .env rather than being wide open.
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests with no Origin header (curl, Postman, same-origin) are fine.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/sites",heritageRoutes);

//routes
const authRoutes = require("./routes/authRoutes");
 const activationRoutes = require("./routes/activationRoutes");

app.use("/api/auth",authRoutes);
 app.use("/api/activation",activationRoutes);

// FEATURE 2 — persistent user badge (protected, JWT-identified)
const badgeRoutes = require("./routes/badgeRoutes");
app.use("/api/user", badgeRoutes);
 app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API is working!" });
});

 

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
