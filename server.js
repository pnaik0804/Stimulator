const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

let packets = [];

app.use(cors());
app.use(express.json());

// Generate packets every 3s
setInterval(() => {
  const packet = {
    id: Math.floor(Math.random() * 100000),
    time: new Date().toISOString(),
    status: "In Transit",
  };
  packets.push(packet);

  // Auto-complete after 10s
  setTimeout(() => {
    packet.status = "Delivered";
  }, 10000);
}, 3000);

app.get("/packets", (req, res) => {
  res.json(packets);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
