(() => {
  const canvas = document.getElementById("many-paths");
  const context = canvas.getContext("2d");

  const dots = Array.from({ length: 240 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 2 + (Math.random() - 0.5) * 200,
    vx: 0,
    vy: 0
  }));

  // ONE-TIME BLACK FILL ONLY
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  function draw() {
    for (const d of dots) {
      d.vx += (Math.random() - 0.5) * 0.8;
      d.vy += (Math.random() - 0.5) * 0.8;

      d.vx *= 0.92;
      d.vy *= 0.92;

      d.x += d.vx;
      d.y += d.vy;

      const hue = (Date.now() * 0.02) % 360;
      context.strokeStyle = `hsl(${hue}, 100%, 75%)`;
      context.lineWidth = 0.05;

      context.beginPath();
      context.moveTo(d.x, d.y);
      context.lineTo(d.x + d.vx * 2, d.y + d.vy * 2);
      context.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
