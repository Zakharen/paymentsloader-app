import { Request, Response, NextFunction } from 'express';

export class User {
    constructor() {
        this.addUser = this.addUser.bind(this);
    }

    addUser(req: Request, res: Response, next: NextFunction) {
        console.log('Adding user');
        return res.status(200).send({...req.body});
    }
}

