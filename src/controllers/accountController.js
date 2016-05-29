var controller = {
	index: function(req, res) {
		res.json({
			result: "awesome"
		});
	},
	signin: function(req, res) {
		res.json({
			result: "signin awesome"
		});
	},
	register: function(req, res) {
		res.json({
			result: "register ok"
		});
	}
};

export default controller;
