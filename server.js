const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//  Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "/scripts/public")));

//  Show frontend when visiting "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/scripts/public", "register.html"));
});

//  Handle Registration API
let users = [];

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, email, password });
  res.json({ message: "Registration successful!" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
