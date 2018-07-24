let boids = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	smooth();

	for (let i = 0; i < 200; i++) {
		if (i > 100)
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
	background(5, 10);

	blendMode(BLEND);
	for (let boid of boids) {
		boid.Run(boids);
		boid.Render()
	}
}