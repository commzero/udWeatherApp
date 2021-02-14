// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParse = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};
// POST route
app.post('/projectData', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    console.log('POST request received', projectData);
    res.send(projectData);
});

// GET route
app.get('/data', (req, res) => {
    console.log('GET request received');
    res.send(projectData);
});
