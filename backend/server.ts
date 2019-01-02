const proxy = require('express-http-proxy');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const authHelper = require('./helpers/auth-helper');

app.use(cors());
app.options('*', cors());

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// set proxy
app.use('/api/payments', authHelper.verifyRequest, proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => '/Payment/GetPaymentsData',
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
    if (authHelper.isAuthenticated({email, password}) === false) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({status, message});
        return;
    }
    const access_token = authHelper.createToken({email, password});
    res.status(200).json({access_token});
});

// start our server on port 4201
app.listen(4201, () => {
    console.log("Server now listening on 4201");
});
