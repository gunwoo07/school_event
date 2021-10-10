// Import express framework for basic http server
const express = require("express");
const app = express();

// Import cookie-parser to read cookie from client
const cookieParser = require("cookie-parser");

// Import questionViewer
const questionViewer = require("./src/questionViewer");


// Declare developing port to 3000
const port = 3000;


// Declare that we are going to use cookie-parser
app.use(cookieParser());
// Declare routers
app.use("/question", questionViewer);


// Start listening
app.listen(port, () => {
    console.log(`Server is listening on 0.0.0.0:${port}`);
});