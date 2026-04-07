const express = require("express");
const cors = require("cors");
const syncRoutes = require("./routes/sync"); // <-- Import new routes
const { getBaseData } = require('./services/syncService');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Attach the sync routes to the /api/sync endpoint
app.use("/api/sync", syncRoutes);

// Legacy compatibility endpoint used by older front-end builds

app.get('/api/corps', async (req, res) => {
  try {
    const { corps } = await getBaseData();
    res.json(corps);
  } catch (error) {
    console.error('Legacy /api/corps Error:', error);
    res.status(500).json({ error: 'Failed to fetch corps' });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});