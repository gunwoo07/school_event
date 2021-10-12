// Import express framework for basic http server
const express = require("express");
const app = express();

// Import cookie-parser to read cookie from client
const cookieParser = require("cookie-parser");
// Import ejs to load html
const ejs = require("ejs");

// Import questionViewer
const questionViewer = require("./src/questionViewer");


// Declare developing port to 3000
const port = 3000;


// Declare that we are going to use cookie-parser
app.use(cookieParser());
// Declare view engine to ejs
app.set("view engine", "ejs");
// Declare routers
app.use("/question", questionViewer);


// Start listening
app.listen(port, () => {
    console.log(`Server is listening on 0.0.0.0:${port}`);
});