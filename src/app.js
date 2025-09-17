// Load environment variables FIRST
// if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Working CORS configuration (same as test server)
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/request", require("./routes/requests"));
app.use("/", require("./routes/user"));

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
