// Import express framework for router
var express = require("express");
var router = express.Router();

// Import fs module to read question file
var fs = require("fs");
// Import path module to connect path
var path = require("path");


// Declare function that check user status
// res: response from client, questions: jsonData["questions"]
let checkStatus = (req, res, questions) => {

    // Declare cookies
    let cookies = req.cookies;
    // Wrong response
    if (cookies === undefined) {
        req.cookie("0", "");
        return 0;
    }

    // More than questions
    if (Object.keys(cookies).length > questions.length) {
        // Delete all cookies
        for (var i = 0; i < Object.keys(cookies).length; i++) {
            res.clearCookie(Object.keys(cookies)[i]);
        }

        // Set 0
        res.cookie("0", "");
        return 0;
    }

    // Check cookeis one by one
    for (var i = 0; i < questions.length; i++) {
        // If i not in cookies or answer is wrong -> move to before step
        if (!Object.keys(cookies).includes(String(i)) || cookies[String(i)] != questions[i]["answer"]) {
            return i;
        }
    }

    // Move to last
    return questions.length;
}


router.get("/", (req, res) => {

    // Declare question data file path
    let filePath = path.join(__dirname, "../data/questions.json");

    // Read question data with utf8 encoding
    fs.readFile(filePath, "utf8", (err, jsonFile) => {

        // If there is an error while reading a question data throw error
        if (err) {
            throw err;
        }

        // Parse txt to json
        let jsonData = JSON.parse(jsonFile);
        // Get now user's status
        let status = checkStatus(req, res, jsonData["questions"]);

        if (status == jsonData["questions"].length) {
            res.render("finish");
            return;
        }

        res.render("questionView", {
            questionNum: status + 1,
            question: jsonData["questions"][status]["question"],
            hint: jsonData["questions"][status]["hint"]
        });
        return;
    });
});


router.get("/:answer", (req, res) => {

    // Declare question data file path
    let filePath = path.join(__dirname, "../data/questions.json");
    // Declare input answer by user
    let userAnswer = req.params.answer;

    // Read question data with utf8 encoding
    fs.readFile(filePath, "utf8", (err, jsonFile) => {

        // If there is an error while reading a question data throw error
        if (err) {
            throw err;
        }

        // Parse txt to json
        let jsonData = JSON.parse(jsonFile);
        // Get now user's status
        let status = checkStatus(req, res, jsonData["questions"]);

        res.cookie(String(status), userAnswer);

        res.redirect(`/question`);
        return;
    });
});


router.post("/finish", (req, res) => {

    // Declare question data file path
    let filePath = path.join(__dirname, "../data/questions.json");

    // Read question data with utf8 encoding
    fs.readFile(filePath, "utf8", (err, jsonFile) => {

        // If there is an error while reading a question data throw error
        if (err) {
            throw err;
        }

        // Parse txt to json
        let jsonData = JSON.parse(jsonFile);
        // Get now user's status
        let status = checkStatus(req, res, jsonData["questions"]);

        if (status == jsonData["questions"].length) {
            let successPath = path.join(__dirname, "../data/success.json");
            fs.readFile(successPath, (err, successFile) => {
                if (err) {
                    throw err;
                }

                // Parse txt to json
                let successData = JSON.parse(successFile);
                // Declare now time
                let now = new Date().toISOString().split("T")[0] + ' ' + new Date().toTimeString().split(" ")[0];

                // Add new success
                successData["users"].push({
                    stdntId: req.body.stdntId,
                    name: req.body.name,
                    time: now
                });

                fs.writeFile(successPath, JSON.stringify(successData, null, 2), () => {});
                // Delete all cookies
                for (var i = 0; i < Object.keys(cookies).length; i++) {
                    res.clearCookie(Object.keys(cookies)[i]);
                }
                return;
            });
            return;
        }
        return;
    });
});


// Export router to use in index.js
module.exports = router;