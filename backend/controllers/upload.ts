import {NextFunction, Request, Response} from 'express';
import {createReadStream} from 'fs';

export class Upload {
    private form: any;

    constructor(form: any) {
        this.form = form;
        this.file = this.file.bind(this);
    }

    file(req: Request, res: Response, next: NextFunction) {
        console.log('========= upload ctrl ============');
        let readStream;
        this.form.on('file', (field: any, file: any) => {
            console.log('========= form file on');
            // Do something with the file
            // e.g. save it to the database
            // you can access it using file.path
            console.log('========= file', file.name);
            readStream = createReadStream(file.path);
        });
        this.form.on('end', () => {
            console.log('========= form file end...');
            res.json();
        });
        console.log('========= form file response ???');
        this.form.parse(req);
    }
}
