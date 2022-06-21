printjson(db.people.aggregate([
	{ $unwind: "$credit" },
	{
		$group: {
			_id: "$credit.currency",
			"sumBalance": { $sum: { $toDouble: "$credit.balance" } }
		}
	},
	{
		$project: {
			_id: 0,
			"currency": "$_id",
			"sumBalance": 1
		}
	}
]).toArray())