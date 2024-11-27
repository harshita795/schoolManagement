const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
require("dotenv").config();

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

app.use(express.json());

app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validating all inputs
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send("Missing required fields");
  }

  // SQL query to insert a new school using post request
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) {
      console.error("Error inserting school:", err.message);
      return res.status(500).send("Error inserting school");
    }
    res.status(201).send("School added successfully");
  });
});

app.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send("Please provide latitude and longitude");
  }

  // Haversine formula to calculate distance
  const haversine = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // SQL query to fetch all schools using get method
  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err.message);
      return res.status(500).send("Error fetching schools");
    }

    // Sort the results by proximity to the user's location
    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: haversine(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
