const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors()); // Allow frontend to connect
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


// ✅ Corrected: Serve the homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "scripts/public", "index.html"));
});

// ✅ Corrected: Serve the register page (register.html)
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "scripts/public", "register.html"));
});

// ✅ Handle form submission (POST request)
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Save user data (for now, we just send a success message)
  res.json({ message: "Registration successful!" });
});

// ✅ Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
