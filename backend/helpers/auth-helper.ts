// mock token
const fs = require('fs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'huspi';
const expiresIn = '2m';
const userdb = JSON.parse(fs.readFileSync('./_users/users.json', 'UTF-8'));

class AuthHelper {

    private userdb: any;

    constructor(userDB: any) {
        this.userdb = userDB;
    }

    // Get token
    static getToken(req: any) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            return req.headers.authorization.split(' ')[1];
        else if (req.query && req.query.token)
            return req.query.token;
        return null;
    }

    // Verify the token
    static verifyToken(token: any) {
        return jwt.verify(token, SECRET_KEY, (err: any, decode: any) => decode !== undefined ? decode : err)
    }

    // Create a token from a payload
    createToken(payload: any) {
        return jwt.sign(payload, SECRET_KEY, {expiresIn})
    }

    // Check if the user exists in database
    isAuthenticated({email, password}: any) {
        return this.userdb.users.findIndex((user: any) => user.email === email && user.password === password) !== -1;
    }

    // auth middleware verification
    verifyRequest(req: any, res: any, next: any) {
        const token = AuthHelper.getToken(req);
        if (!token) {
            return res.status(401).send({error: 'NoTokenError'});
        } else {
            const tokenCheckingResult = AuthHelper.verifyToken(token);
            if (tokenCheckingResult.constructor.name === 'TokenExpiredError') {
                return res.status(401).send({error: 'TokenExpiredError'});
            } else {
                return next();
            }
        }
    }
}

module.exports = new AuthHelper(userdb);
