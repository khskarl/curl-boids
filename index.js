let curlField;
const numBoids = 60;
let boids = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	smooth();
	noStroke();

	curlField = new CurlField(width, height);
	let velocityField = curlField.curlField;
	
	var img = createImage(width, height);
	img.loadPixels();
	for (let i = 0; i < velocityField.length; i++) {
		for (let j = 0; j < velocityField[i].length; j++) {
			// fill(velocityField[i][j] * 255, 255);
			// rect(i, j, 1, 1);
			// noiseDetail(4, 0.75);
			// let l = noise(i/50, j/50) * 255;
			let l = velocityField[i][j];
			img.set(i, j, color(l.x, l.y, 0));
		}
	}
	img.updatePixels();
	image(img, 0, 0);

	for (let i = 0; i < numBoids; i++) {
		if (i > numBoids / 2)
			boids[i] = new Boid(random(width), random(height), 0);
		else
			boids[i] = new Boid(random(width), random(height), 1);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	blendMode(OVERLAY);
	//background(5, 10);

	blendMode(BLEND);
	for (let boid of boids) {
		boid.Run(boids);
		boid.Render()
	}
}
