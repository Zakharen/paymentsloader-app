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

        try {
            this.form.parse(req);

            // this.form.on('file', (field: any, file: any) => {
            //     console.log('========= form file on');
            //     // Do something with the file
            //     // e.g. save it to the database
            //     // you can access it using file.path
            //     console.log('========= file', file.name);
            //     readStream = createReadStream(file.path);
            // });


            this.form.on('fileBegin', (name: any, file: any) => {
                console.log('=== fileBegin && __dirname is ', __dirname);
                // file.path = __dirname + '/data/' + file.name;
            });

            this.form.on('file', (name: any, file: any) => {
                console.log('Uploaded ' + file.name);
            });

            this.form.on('end', () => {
                // res.json();
                console.log('=== end');
                const status = 200;
                const message = 'Result: all files were uploaded';
                return res.status(status).send({status, message});
            });

            // const status = 200;
            // const message = 'Result: all files were uploaded';
            // return res.status(status).send({status, message});

        } catch (e) {
            const status = 500;
            const message = 'Result: files uploading server error';
            return res.status(status).send({status, message});
        }
    }
}
