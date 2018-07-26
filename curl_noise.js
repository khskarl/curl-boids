class CurlField {
	constructor(canvasWidth, canvasHeight, subdivisions) {
		this.subdivisions = subdivisions;

		this.width = ceil(canvasWidth / subdivisions);
		this.height = ceil(canvasHeight / subdivisions);

		noiseDetail(8, 0.75);
		let noiseField = Array(this.width).fill().map((e, i) => 
			Array(this.height).fill().map((e, j) => noise(i / 1, j / 1))
		)

		this.noiseField = noiseField;
		this.ComputeCurlField(noiseField);
	}

	ComputeCurlField (noiseField) {
		const width  = noiseField.length;
		const height = noiseField[0].length;

		console.log("Computing Curl Field")
		console.log("Width:  " + width);
		console.log("Height: " + height);

		let curlField = Array(width).fill().map((e, i) =>
			Array(height).fill().map((e, j) => createVector(0, 0))
		)

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				let i0 = min(i + 1, width - 1);
				let i1 = max(i - 1, 0);
				let j0 = min(j + 1, height - 1);
				let j1 = max(j - 1, 0);

				const dx = noiseField[i0][j] - noiseField[i1][j];
				const dy = noiseField[i][j0] - noiseField[i][j1];

				curlField[i][j] = createVector(dy, -dx);
			}
		}

		this.curlField = curlField;
	}

	GetVelocityVector (canvasPosition) {
		// console.log(canvasPosition)
		// console.log("raw x: " + canvasPosition.x);
		// console.log("raw y: " + canvasPosition.y);
		
		let x = constrain(floor(canvasPosition.x / this.subdivisions), 0, this.width  - 1);
		let y = constrain(floor(canvasPosition.y / this.subdivisions), 0, this.height - 1);
		// console.log("x: " + x);
		// console.log("y: " + y);
		return this.curlField[x][y];
	}

	Render () {

	}
}