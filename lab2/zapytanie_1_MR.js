printjson(db.people.mapReduce(
	function () {
		emit(this.sex, {
			weight: parseFloat(this.weight),
			height: parseFloat(this.height)
		});
	},
	function (key, values) {
		const allWeights = values.map(v => v.weight);
		const allHeights = values.map(v => v.height);
		const avg = array => array.reduce((x, y) => x + y) / array.length;
		return {
			weight: avg(allWeights),
			height: avg(allHeights),
		};
	},
	{ out: { inline: 1 } }
))