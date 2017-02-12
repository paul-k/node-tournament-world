import roundGenertor from 'services/roundGenerator';

var controller = {
	roundRobin: function(req, res) {

		let participantIds = req.body;
		let result = roundGenertor(participantIds);

		res.json(result);
	}
};

export default controller;
