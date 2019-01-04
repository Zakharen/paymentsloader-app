import * as userDB from './_users/users.json';
import {User} from './controllers/user';
import {Auth} from './controllers/auth';
import {AuthHelper} from './helpers/';

const proxy = require('express-http-proxy');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors());

// Handle POST requests that come in formatted as JSON
app.use(express.json());

const authHelper = new AuthHelper(userDB);
const authCtrl = new Auth(authHelper);
const userCtrl = new User(userDB, authHelper);

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

app.post('/api/login', authCtrl.login);
app.post('/api/user', authHelper.verifyRequest, userCtrl.addUser);

// start our server on port 4201
app.listen(4201, () => {
    console.log('Server now listening on 4201');
});
