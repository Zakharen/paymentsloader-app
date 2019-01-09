// mock token
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'huspi';
const expiresIn = '15m';

export class AuthHelper {

    private userDB: any;

    constructor(userDB: any) {
        this.userDB = userDB;
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
    static createToken(payload: any) {
        return jwt.sign(payload, SECRET_KEY, {expiresIn})
    }

    // auth middleware verification
    static verifyRequest(req: any, res: any, next: any) {
        const token = AuthHelper.getToken(req);
        if (!token) {
            return res.status(401).send({error: 'NoTokenError', message: 'User is unauthorized'});
        } else {
            const tokenCheckingResult = AuthHelper.verifyToken(token);
            if (tokenCheckingResult.constructor.name === 'TokenExpiredError') {
                return res.status(401).send({error: 'TokenExpiredError', message: 'User is unauthorized'});
            } else {
                return next();
            }
        }
    }

    // Check if the user exists in authenticated
    isAuthenticated({email, password}: any) {
        return this.userDB.users.findIndex((user: any) => user.email === email && user.password === password) !== -1;
    }

    // Check if the user exists in database
    isUserExist(email: string) {
        return this.userDB.users.findIndex((user: any) => user.email === email) !== -1;
    }

    getUserById(id: any) {
        const user = this.userDB.users.find((user: any) => user.id === id);
        if (user && Object.keys(user).length) {
            return user;
        }
        return null;
    }

    getUserCredentials(email: string) {
        const user = this.userDB.users.find((user: any) => user.email === email);
        if (user && user.hasOwnProperty('type')) {
            return user.type;
        }
        return null;
    }
}
