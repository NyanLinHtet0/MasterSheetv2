const express = require("express");
const cors = require("cors");
const syncRoutes = require("./routes/sync"); // <-- Import new routes

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Attach the sync routes to the /api/sync endpoint
app.use("/api/sync", syncRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});