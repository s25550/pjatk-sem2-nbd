printjson(db.people.aggregate([
	{
		$match: {
			sex: "Female",
			nationality: "Poland"
		}
	},
	{
		$unwind: "$credit"
	},
	{
		$group: {
			_id: "$credit.currency",
			"avgBalance": { $avg: { $toDouble: "$credit.balance" } },
			"sumBalance": { $sum: { $toDouble: "$credit.balance" } }
		}
	},
	{
		$project: {
			_id: 0,
			curr: "$_id",
			"avgBalance": 1,
			"sumBalance": 1
		}
	},
	{
		$sort: { curr: 1 }
	}
]).toArray())