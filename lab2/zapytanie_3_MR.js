printjson(db.people.mapReduce(
	function () {
		emit(this.job, this.job);
	},
	function (key, values) {
		return null;
	},
	{ out: { inline: 1 } }
))