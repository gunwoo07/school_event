// Import express framework for router
var express = require("express");
var router = express.Router();




router.get("/", (req, res) => {
	var cookies = req.cookies;
	var nameOfCookies = Object.keys(cookies);
	
	for (var i = 0; i < nameOfCookies.length; i++) {
		res.clearCookie(nameOfCookies[i]);
		// res.clearCookie(nameOfCookies[i]);
	}
    res.render("description");
});


// Export router to use in index.js
module.exports = router;