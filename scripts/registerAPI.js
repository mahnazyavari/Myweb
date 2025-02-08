const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Allow frontend to connect
app.use(bodyParser.json());

let users = []; // Temporary storage

// Home route (Fixes "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("Welcome to MyWeb API! Use /register to create an account.");
});

// Handle registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, email, password });
  res.json({ message: "Registration successful!" });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
