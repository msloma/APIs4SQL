var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	global.connection.query('SELECT * from questionanswer', function (error, results, fields) {
		if (error) throw error;
		//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		res.send(JSON.stringify(results));
	});
});

module.exports = router;
