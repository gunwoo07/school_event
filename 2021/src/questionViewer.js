// Import express framework for router
var express = require("express");
var router = express.Router();

// Import fs module to read question file
var fs = require("fs");
// Import path module to connect path
var path = require("path");


// Declare function that check user status
// res: response from client, questions: jsonData["questions"]
let checkStatus = (req, questions) => {

    // Declare cookies
    let cookies = req.cookies;
    console.log(req.cookies)
    // Wrong response
    if (cookies === undefined) {
        console.log("Wrong inupt")
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
        req.cookie("0", "");
        return 0;
    }

    // Check cookeis one by one
    for (var i = 0; i < questions.length; i++) {
        // If i not in cookies or answer is wrong -> move to before step
        if (!Object.keys(cookies).includes(String(i)) || cookies[String(i)] !== questions[i]["answer"]) {
            return i;
        }
    }

    // Move to last
    return questions.length - 1;
}


router.get("/:questionNum", (req, res) => {

    // Declare question data file path
    let filePath = path.join(__dirname, "../data/questions.json");
    // Declare input user status
    let questionNum = parseInt(req.params.questionNum);

    // Read question data with utf8 encoding
    fs.readFile(filePath, "utf8", (err, jsonFile) => {

        // If there is an error while reading a question data throw error
        if (err) {
            throw err;
        }

        // Parse txt to json
        let jsonData = JSON.parse(jsonFile);
        // Get now user's status
        let status = checkStatus(req, jsonData["questions"]);

        // If status is different to now status -> Move user to correct status
        if (status !== questionNum) {
            res.redirect(`/question/${status}`);
            return;
        }

        res.render("questionView", {
            questionNum: questionNum + 1,
            question: jsonData["questions"][questionNum]["question"],
            hint: jsonData["questions"][questionNum]["hint"]
        });
    });
});


router.get("/:questionNum/:answer", (req, res) => {

    // Declare question data file path
    let filePath = path.join(__dirname, "../data/questions.json");
    // Declare input user status
    let questionNum = parseInt(req.params.questionNum);
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
        let status = checkStatus(res, jsonData["Questions"]);

        // If status is different to now status -> Move user to correct status
        if (status !== questionNum) {
            res.redirect(`/question/${status}`);
            return;
        }

        
        // If userAnswer == realAnswer -> redirect to next status
        if (userAnswer == jsonData["questions"][questionNum]["answer"]) {
            res.cookie(String(status), userAnswer);
            res.redirect(`/question/${status + 1}`);
            return;
        }

        return;
    });
});


// Export router to use in index.js
module.exports = router;