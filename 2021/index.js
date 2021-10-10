// Import express framework for basic http server
const express = require("express");
const app = express();


// Declare developing port to 3000
const port = 3000;


// Start listening
app.listen(port, () => {
    console.log(`Server is listening on 0.0.0.0:${port}`);
});