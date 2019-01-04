import { Request, Response, NextFunction } from 'express';
import {AuthHelper} from '../helpers/auth-helper';

export class Auth {
    private authHelper: AuthHelper;
    constructor(authHelper: AuthHelper) {
        this.authHelper = authHelper;
        this.login = this.login.bind(this);
    }

    login(req: Request, res: Response, next: NextFunction) {
        console.log('Login user');
        const {email, password} = req.body;
        if (this.authHelper.isAuthenticated({email, password}) === false) {
            const status = 401;
            const message = 'Incorrect email or password';
            res.status(status).json({status, message});
            return;
        }
        const access_token = this.authHelper.createToken({email, password});
        const userCredentials = this.authHelper.getUserCredentials(email);
        res.status(200).json({access_token, userCredentials});
    }
}
