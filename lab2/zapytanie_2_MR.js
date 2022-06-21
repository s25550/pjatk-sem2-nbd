printjson(db.people.mapReduce(
	function () {
		this.credit.forEach(cred => emit(cred.currency, parseFloat(cred.balance)));
	},
	function (key, values) {
		return values.reduce((x, y) => x + y);
	},
	{ out: { inline: 1 } }
))