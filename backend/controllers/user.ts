import {Request, Response, NextFunction} from 'express';
import {v1} from 'uuid';
import {AuthHelper, FileHelper} from '../helpers/';

export class User {
    private userDB: any;
    private authHelper: AuthHelper;
    private path: string = './_users/users.json';

    constructor(userDB: any, authHelper: AuthHelper) {
        this.userDB = userDB;
        this.authHelper = authHelper;
        this.addUser = this.addUser.bind(this);
    }

    addUser(req: Request, res: Response, next: NextFunction) {
        // check if new user is unique
        if (this.authHelper.isUserExist(req.body.email)) {
            const status = 409;
            const message = 'Conflict: email is already registered';
            res.status(status).json({status, message});
            return;
        }
        const db = FileHelper.loadData(this.path);
        if (db && Object.keys(db).length && db.hasOwnProperty('users')) {
            const newUser = {
                "id": v1(),
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "type": req.body.type
            };
            console.log('newUser:', newUser);
            db.users.push(newUser);
            FileHelper.storeData(db, this.path);
            return res.status(200).send({...req.body});
        }
        const status = 500;
        const message = 'Server error: could not create a new user';
        return res.status(500).json({status, message});
    }
}

