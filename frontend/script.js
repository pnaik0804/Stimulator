
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let packetMap = {}; // id -> x, y

function drawNode(x, y, label) {
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(x - 30, y - 30, 60, 60);
  ctx.fillStyle = "white";
  ctx.fillText(label, x - 20, y + 5);
}

function drawPacket(x, y, color = "#2196F3") {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawNode(100, 200, "Source");
  drawNode(700, 200, "Destination");

  fetch("https://localhost:3000/packets/packets") // Update with actual URL
    .then(res => res.json())
    .then(data => {
      data.forEach((p, i) => {
        if (!packetMap[p.id]) {
          packetMap[p.id] = { x: 100, y: 100 + (i * 20) };
        }

        if (p.status === "In Transit" && packetMap[p.id].x < 700) {
          packetMap[p.id].x += 2;
        }

        const color = p.status === "Delivered" ? "#8BC34A" : "#2196F3";
        drawPacket(packetMap[p.id].x, packetMap[p.id].y, color);
      });
    });

  requestAnimationFrame(animate);
}

function startSimulation() {
  packetMap = {};
  animate();
}
