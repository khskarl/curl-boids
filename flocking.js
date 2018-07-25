class Boid {
	constructor(x, y, type) {
		this.position = createVector(x, y);
		// this.velocity = p5.Vector.random2D();
		this.velocity = createVector(20, 0);
		this.acceleration = createVector(0, 0);

		this.radius = 10.0;
		this.maxSpeed = 4;
		this.maxSteeringForce = 0.05;

		this.type = type;

		this.separationWeight = 1.0;
		this.alignmentWeight  = 1.0;
		this.cohesionWeight   = 1.0;
	}

	Render () {
		if (this.type == 0)
			fill(241, 73, 127, 180);
		else
			fill(73, 170, 241, 180);

		noStroke();

		let r = this.radius + sin(millis() * 0.006) * 2;
		ellipse(this.position.x, this.position.y, r, r);
	}

	WrapAround () {
		if (this.position.x < -this.radius) this.position.x = width + this.radius;
		if (this.position.y < -this.radius) this.position.y = height + this.radius;
		if (this.position.x > width + this.radius) this.position.x = -this.radius;
		if (this.position.y > height + this.radius) this.position.y = -this.radius;
	}

	Run (boids) {
		this.Flock(boids);
		this.Update();
		this.WrapAround();
	}

	Update() {
		this.velocity.add(this.acceleration);

		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);

		this.acceleration.mult(0);
	}

	ApplyForce(force) {
		this.acceleration.add(force);
	}

	Flock (boids) {
		let separation = this.Separate(boids);
		let alignment  = this.Align(boids);
		let cohesion   = this.Cohesion(boids);

		separation.mult(this.separationWeight);
		alignment .mult(this.alignmentWeight);
		cohesion  .mult(this.cohesionWeight);

		this.ApplyForce(separation);
		this.ApplyForce(alignment);
		this.ApplyForce(cohesion);
	}

	/* Computes force to Separate itself up to a desired from other boids */
	Separate (boids) {
		const desiredDistance = 25.0;

		let steer = createVector(0, 0);
		let count = 0;
		for (let other of boids) {
			let d = p5.Vector.dist(this.position, other.position);

			if (0 < d && d < desiredDistance) {
				let direction = p5.Vector.sub(this.position, other.position);

				direction.normalize().div(d);
				steer.add(direction);
				count++;
			}
		}

		// Normalization
		if (count > 0) {
			steer.div(count);
		}

		// Reynolds: Steering = Desired - Velocity, only if steering
		if (0 < steer.mag()) {
			steer.normalize();
			steer.mult(this.maxSpeed);
			steer.sub(this.velocity);
			steer.limit(this.maxSteeringForce);
		}

		return steer;
	}

	/* Computes force to Align it's velocity to neighbor boids */
	Align (boids) {
		const neighborhoodRadius = 50;

		let sum = createVector(0, 0);
		let count = 0;
		for (const other of boids) {
			let distance = p5.Vector.dist(this.position, other.position);

			if (0 < distance && distance < neighborhoodRadius) {
				sum.add(other.velocity);
				count++;
			}
		}

		if (count > 0) {
			sum.div(count);
			sum.normalize();
			sum.mult(this.maxSpeed);

			let steer = p5.Vector.sub(sum, this.velocity);
			steer.limit(this.maxSteeringForce);

			return steer;
		}
		else {
			return createVector(0, 0);
		}
	}

	/* Computes center of mass of neighbor boids and computes force to fly towards it */
	Cohesion (boids) {
		const neighborhoodRadius = 50;

		let sum = createVector(0, 0);
		let count = 0;
		for (const other of boids) {
			let distance = p5.Vector.dist(this.position, other.position);

			if (0 < distance && distance < neighborhoodRadius) {
				sum.add(other.position);
				count++;
			}
		}

		if (count > 0) {
			sum.div(count);
			return this.Seek(sum);
		}
		else {
			return createVector(0, 0);
		}
	}

	Seek (target) {
		let desired = p5.Vector.sub(target, this.position);
		desired.normalize().mult(this.maxSpeed);

		let steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxSteeringForce);

		return steer;
	}
}
