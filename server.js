const express = require("express");
const app = express();
const port = 3002; // Different port

// Simple CORS handler
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  console.log("Origin:", req.headers.origin);

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );

  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    res.header("Content-Length", "0");
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

// Simple test route
app.patch("/test", (req, res) => {
  console.log("PATCH request successful!");
  res.json({ message: "PATCH worked!", body: req.body });
});

app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`);
});
