printjson(db.people.mapReduce(
	function () {
		this.credit.forEach(c => emit(c.currency, {
			balance: parseFloat(c.balance),
			sum: 0,
			avg: 0
		}));
	},
	function (key, values) {
		let balances = values.map(v => v.balance);
		return {
			sum: balances.reduce((x, y) => x + y),
			avg: balances.reduce((x, y) => x + y) / balances.length,
			balance: 0
		};
	},
	{
		out: { inline: 1 },
		query: {
			sex: "Female",
			nationality: "Poland"
		},
		finalize: function (k, v) {
			return {
				currency: k,
				sum: v.sum,
				avg: v.avg
			};
		}
	}
))