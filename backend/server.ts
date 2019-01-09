import * as userDB from './_users/users.json';
import {User} from './controllers/user';
import {Auth} from './controllers/auth';
import {AuthHelper, RequestHelper} from './helpers/';
import {Upload} from './controllers/upload';
import {PaymentsHelper} from './helpers/payments-helper';

const proxy = require('express-http-proxy');
const cors = require('cors');
const IncomingForm = require('formidable').IncomingForm;
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors());

// Handle POST requests that come in formatted as JSON
app.use(express.json());

const authHelper = new AuthHelper(userDB);
const authCtrl = new Auth(authHelper);
const userCtrl = new User(userDB, authHelper);
const uploadCtrl = new Upload(new IncomingForm());

// proxy endpoints
app.use('/api/payments', AuthHelper.verifyRequest, proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => {
        return `/Payment/GetPaymentsData${RequestHelper.paramsParser(req.url)}`;
    },
    userResDecorator: (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => {
        return PaymentsHelper.paymentsDataParser(proxyResData);
    }
}));
app.use('/api/payment', AuthHelper.verifyRequest, proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => {
        return `/Payment/SetPaymentsData?RowId=${req.body.RowId}&Accepted=${req.body.Accepted}`;
    }
}));
app.use('/api/accounts', AuthHelper.verifyRequest, proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => '/Payment/Getaccountsdata'}));
app.use('/api/dbfs', AuthHelper.verifyRequest, proxy('http://46.164.148.178:8001', {
    proxyReqPathResolver: (req: any) => '/Payment/GetDBFExportData',
}));

app.post('/api/login', authCtrl.login);
app.get('/api/user', AuthHelper.verifyRequest, userCtrl.users);
app.post('/api/user', AuthHelper.verifyRequest, userCtrl.addUser);
app.delete('/api/user/:id', AuthHelper.verifyRequest, userCtrl.deleteUser);
app.post('/api/upload', AuthHelper.verifyRequest, uploadCtrl.file);

// start our server on port 4201
app.listen(4201, () => {
    console.log('Server now listening on 4201');
});
