const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

let packets = [];
let routerIndex = 0;

app.use(cors());
app.use(express.json());

setInterval(() => {
  const packet = {
    id: Math.floor(Math.random() * 100000),
    time: new Date().toISOString(),
    status: "In Transit",
    router: `Router-${(routerIndex % 3) + 1}`
  };

  routerIndex++;
  packets.push(packet);

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
