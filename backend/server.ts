const proxy = require('express-http-proxy');
const express = require('express');
const app = express();

// mock token
const fs = require('fs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'huspi';
const expiresIn = '2m';
const userdb = JSON.parse(fs.readFileSync('./_users/users.json', 'UTF-8'));
// Create a token from a payload
const createToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
};
// Verify the token
const verifyToken = (token: any) => {
    return  jwt.verify(token, SECRET_KEY, (err: any, decode: any) => decode !== undefined ?  decode : err)
};
// Check if the user exists in database
const isAuthenticated = ({email, password}: any) => {
    return userdb.users.findIndex((user: any) => user.email === email && user.password === password) !== -1;
};


// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Add headers
app.use((req: any, res: any, next: any) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // If needed
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // If needed
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // If needed
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// set proxy
app.use('/api/payments', proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => {
        console.log('REQUEST >>>>>> ', req);
        return '/Payment/GetPaymentsData';
    },
    userResDecorator: (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => {
        console.log('HANDLED RESPONSE ===============================');
        return proxyResData;
    }
}));
app.use('/api/dbfs', proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => '/Payment/GetDBFExportData',
}));

// fake auth
app.post('/api/login', (req: any, res: any) => {
    const {email, password} = req.body;
    if (isAuthenticated({email, password}) === false) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({status, message});
        return;
    }
    const access_token = createToken({email, password});
    res.status(200).json({access_token});
});

// start our server on port 4201
app.listen(4201, () => {
    console.log("Server now listening on 4201");
});
