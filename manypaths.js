const canvas = document.getElementById("many-paths");
const context = canvas.getContext("2d");

const dots = Array.from({length: 240}, () => ({
	x: canvas.width/2 + (Math.random()-0.5)*200,	//random generation of x and y
	y: canvas.height/2 + (Math.random()-0.5)*200,
	phase: Math.random() * Math.PI * 2,				//random phase shift
	vx: 0,	//velocity, need to make sure dots aren't just jumping from place to place
	vy: 0
}));

let cx = canvas.width / 2;		//center height and width
let cy = canvas.height /2;

function draw() {
	const t2 = Date.now() * 0.0002;		//Date.now() to constantly update
	
	cx += (Math.random()-0.5) * 4.0;	//Add randomness to the "center" value
	cy += (Math.random()-0.5) * 4.0;
	
	cx += (canvas.width/2 - cx) * 0.005;	//Pull to the center
	cy += (canvas.height/2 - cy) * 0.005;
	
	const t = Date.now() * 0.001;
	
	for(const d of dots){
		//base velocity on random number generation
		d.vx += (Math.random()-0.5)*0.8;
		d.vy += (Math.random()-0.5)*0.8;
		
		//drag
		d.vx *= 0.92;
		d.vy *= 0.92;
		
		//change
		d.x += d.vx;
		d.y += d.vy;
		
		//color change
		const hue = (Date.now() * 0.02) % 360;
		context.strokeStyle = `hsl(${hue}, 100%, 75%)`;
		context.lineWidth = 0.05;
		
		context.beginPath();
		context.moveTo(d.x, d.y);
		context.lineTo(d.x + d.vx * 2, d.y + d.vy * 2);
		context.stroke();
	}
	requestAnimationFrame(draw);	//Function call
	}
	
	context.fillstyle = "white";
	context.fillRect(0,0,canvas.width, canvas.height);
	
	draw();