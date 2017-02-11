var controller = {
	get: function(req, res) {
		res.json([
			{ id: 1, name: 'Dave' },
			{ id: 2, name: 'Alvin' },
			{ id: 3, name: 'Simon' },
			{ id: 4, name: 'Theodore' }
		]);
	}
};

export default controller;
