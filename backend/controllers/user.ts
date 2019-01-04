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
        // added to safe this reference
        this.users = this.users.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    users(req: Request, res: Response, next: NextFunction) {
        const db = FileHelper.loadData(this.path);
        const users = db.users.map((user: any) => {
            return {id: user.id, name: user.name, email: user.email, type: user.type}
        });
        return res.status(200).send({users});
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
            db.users.push(newUser);
            FileHelper.storeData(db, this.path);
            return res.status(200).send({...req.body});
        }
        const status = 400;
        const message = 'Server error: could not create a new user';
        return res.status(400).json({status, message});
    }

    deleteUser(req: Request, res: Response, next: NextFunction) {
        if (req.hasOwnProperty('params') && req.params.hasOwnProperty('id') && req.params.id) {
            const db = FileHelper.loadData(this.path);
            db.users = db.users.filter((user: any) => user.id !== req.params.id);
            FileHelper.storeData(db, this.path);
            const status = 200;
            const message = 'Result: user was successfully removed';
            return res.status(status).send({status, message});
        }
        const status = 400;
        const message = 'Error: something went wrong, check request params.';
        return res.status(400).json({status, message});
    }
}

