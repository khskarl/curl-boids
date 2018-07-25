class CurlField {
	constructor(width, height) {
		this.width  = width;
		this.height = height;
		
		// noiseDetail(4, 0.75);
		let noiseField = Array(width).fill().map((e, i) => 
			Array(height).fill().map((e, j) => noise(i / 50, j / 50))
		)

		this.noiseField = noiseField;
		this.ComputeCurlField(noiseField);
	}

	ComputeCurlField (noiseField) {
		const epsilon = 0.0004;

		const width  = noiseField.length;
		const height = noiseField[0].length;
		let curlField = Array(width).fill().map((e, i) => 
			Array(height).fill().map((e, j) => createVector(0, 0))
		)

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				let i0 = min(i + 1, width);
				let i1 = max(i - 1, width);
				let j0 = min(j + 1, height);
				let j1 = max(j - 1, height);
				
				const dx = noiseField[i0][j] - noiseField[i1][j];
				const dy = noiseField[i][j0] - noiseField[i][j1];

				curlField = createVector(dy, -dx);
			}
		}

		this.curlField;
	}
		
	Render () {
	
	}
}