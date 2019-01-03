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
        try {
            const output = [];
            const resData = JSON.parse(proxyResData);
            if (resData && resData instanceof Array) {
                for (let i = 0; i < resData.length; i++) {
                    if (resData[i].row_11) {
                        output.push(resData[i]);
                    }
                }
                return JSON.stringify(output);
            } else {
                return proxyResData;
            }
        } catch (e) {
            console.log('/Payment/GetPaymentsData parsing error');
            return proxyResData;
        }
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
    const userCredentials = authHelper.getUserCredentials(email);
    res.status(200).json({access_token, userCredentials});
});

// start our server on port 4201
app.listen(4201, () => {
    console.log("Server now listening on 4201");
});
