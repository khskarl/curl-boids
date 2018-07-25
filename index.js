let curlField;
const numBoids = 60;
let boids = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	smooth();
	noStroke();

	curlField = new CurlField(width, height, 40);
	let field = curlField.curlField;

	for (let i = 0; i < curlField.width; i++) {
		for (let j = 0; j < curlField.height; j++) {
			let l = field[i][j];
			let x = i * curlField.subdivisions;
			let y = j * curlField.subdivisions;

			fill(l.mag() * 255);
			// rect(x, y, curlField.subdivisions, curlField.subdivisions);
		}
	}

	// DrawVectorField(curlField.curlField);

	for (let i = 0; i < numBoids; i++) {
		if (i > numBoids / 2)
			boids[i] = new Boid(random(width), random(height), 0);
		else
			boids[i] = new Boid(random(width), random(height), 1);
	}
}

function DrawVectorField (vectorField) {
	stroke(255);
	const width = vectorField.length;
	const height = vectorField[0].length;
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let vector = vectorField[i][j].mult(30.0);
			let x = i * curlField.subdivisions + curlField.subdivisions / 2;
			let y = j * curlField.subdivisions + curlField.subdivisions / 2;
			line(x, y, x + vector.x, y + vector.y);
		}
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
		let environmentForce = curlField.GetVelocityVector(boid.position);
		boid.ApplyForce(environmentForce.mult(0.7));
		boid.Run(boids);
		boid.Render()
	}
}
