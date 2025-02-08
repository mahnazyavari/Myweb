const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Allow frontend (AEM) to send requests to backend
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

let users = []; // Tempogggggggggggggggggrary storage

app.get("/", (req, res) => {
  res.send("Welcome to MyWeb API! Use /register to create an account.");
});

// GET endpoint for /register to avoid "Cannot GET /register" error
app.get("/register", (req, res) => {
  res.send("This is the registration endpoint. Please send a POST request to register.");
});

// Handle registration requests from frontend
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, email, password });
  res.json({ message: "Registration successful!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
