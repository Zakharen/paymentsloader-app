import * as express from 'express';
export const routes = express.Router();

routes.get('/payments', (req, res) => res.send({hello: 'payments'}));
routes.get('/dbfs', (req, res) => res.send({hello: 'dbfs'}));
