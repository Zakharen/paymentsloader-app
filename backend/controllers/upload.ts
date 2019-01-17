import {NextFunction, Request, Response} from 'express';

export class Upload {
    private form: any;

    constructor(form: any) {
        this.form = form;
        this.file = this.file.bind(this);
    }

    file(req: any, res: Response, next: NextFunction) {
        try {

            this.form.parse(req);

            this.form.on('fileBegin', (name: any, file: any) => {
                file.path = __dirname + '/data/' + file.name;
            });

            this.form.on('file', (name: any, file: any) => {
                console.log('Uploaded ' + file.name);
            });

            const status = 200;
            const message = 'Result: all files were uploaded';
            return res.status(status).send({status, message});

        } catch (e) {
            const status = 500;
            const message = 'Result: files uploading server error';
            return res.status(status).send({status, message});
        }
    }
}
