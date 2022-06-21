printjson(db.people.mapReduce(
	function () {
		emit(this.nationality, {
			weight: this.weight,
			height: this.height
		});
	},
	function (key, values) {
		let sumBMI = 0, maxBMI = 0, minBMI = Infinity;
		values.forEach(value => {
			const height = value.height / 100;
			const bmi = value.weight / (height * height);
			sumBMI += bmi;
			if (bmi > maxBMI) {
				maxBMI = bmi;
			}
			if (bmi < minBMI) {
				minBMI = bmi;
			}
		});
		return {
			avgBMI: sumBMI / values.length,
			maxBMI,
			minBMI
		};
	},
	{
		out: { inline: 1 }
	}
))