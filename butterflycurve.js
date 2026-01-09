const butterflyCanvas = document.getElementById("butterfly-curve");
		const ctx = butterflyCanvas.getContext("2d");

		const W = butterflyCanvas.width, H = butterflyCanvas.height;
		const bcx = W / 2, bcy = H / 2 - 15;

		const T_MAX = 12 * Math.PI;
		const DT = 0.02;
		const SCALE = 22;
		const TRAIL = 1400;

		let t = 0;

		// THE CURVE POINTS
		const pts = [];
		for (let tt = 0; tt <= T_MAX; tt += DT) {
		  const r =
			Math.exp(Math.cos(tt)) -
			2 * Math.cos(4 * tt) -
			Math.pow(Math.sin(tt / 12), 5);

		  pts.push({
			x: Math.sin(tt) * r * SCALE,
			y: Math.cos(tt) * r * SCALE
		  });
		}

		function draw() {
		  ctx.fillStyle = "white";
		  ctx.fillRect(0, 0, W, H);

		  const head = Math.floor(t) % pts.length;
		  const start = Math.max(0, head - TRAIL);

		  ctx.strokeStyle = "#d63c1a"; //tomato red
		  ctx.lineWidth = 0.35;

		  ctx.beginPath();
		  for (let i = start; i <= head; i++) {
			const p = pts[i];
			const x = bcx + p.x;
			const y = bcy + p.y;
			if (i === start) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		  }
		  ctx.stroke();

		  t += 3;
		  requestAnimationFrame(draw);
		}

		draw();