const express = require('express');
const app = express();

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Add headers
app.use(function (req: any, res: any, next: any) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // If needed
    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // If needed
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // If needed
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// A default hello word route
app.get('/api', (req: any, res: any) => {
    res.send({hello: 'world'});
});

// start our server on port 4201
app.listen(4201, () => {
    console.log("Server now listening on 4201");
});
