// Import express framework for basic http server
const express = require("express");
const app = express();

// Import body-parser to read post data
const bodyParser = require("body-parser");
// Import cookie-parser to read cookie from client
const cookieParser = require("cookie-parser");
// Import ejs to load html
const ejs = require("ejs");

// Import questionViewer, already
const questionViewer = require("./src/questionViewer");
const already = require("./src/already");
const description = require("./src/description");


// Declare developing port to 3000
const port = 3000;


// Declare that we are going to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Declare that we are going to use cookie-parser
app.use(cookieParser());
// Declare view engine to ejs
app.set("view engine", "ejs");
// Declare routers
app.use("/question", questionViewer);
app.use("/already", already);
app.use("/", description);


// Start listening
app.listen(port, () => {
    console.log(`Server is listening on 0.0.0.0:${port}`);
});