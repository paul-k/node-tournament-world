var controller = {
	get: function(req, res) {
		//console.log('load', req.params.tid);
		res.json({
			participants: [
				{
					id: 1,
					name: 'one'
				},
				{
					id: 2,
					name: 'two'
				},
				{
					id: 3,
					name: 'three'
				},
				{
					id: 4,
					name: 'four'
				}
			],
			rounds: [
				{
					id: 1,
					groups: [
						{
							groupId: 2,
							firstId: 3,
							secondId: 4,
							winnerId: 4
						},
						{
							groupId: 1,
							firstId: 1,
							secondId: 2,
							winnerId: 1
						}
					]
				},
				{
					id: 2,
					groups: [
						{
							groupId: 2,
							firstId: 2,
							secondId: 4,
							winnerId: 0
						},
						{
							groupId: 1,
							firstId: 1,
							secondId: 3,
							winnerId: 0
						}
					]
				},
				{
					id: 3,
					groups: [
						{
							groupId: 2,
							firstId: 2,
							secondId: 3,
							winnerId: 0
						},
						{
							groupId: 1,
							firstId: 1,
							secondId: 4,
							winnerId: 0
						}
					]
				}
			]
		});
	}
};

export default controller;
