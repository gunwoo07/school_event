// Import express framework for router
var express = require("express");
var router = express.Router();


router.get("/", (req, res) => {
    res.render("description");
});


// Export router to use in index.js
module.exports = router;