import express from 'express';

import SessionController from './controllers/SessionController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

routes.post('/users/create', SessionController.create);
routes.post('/users/login', SessionController.login);
routes.post('/users/forgot-password', SessionController.forgot);
routes.post('/users/reset-password', SessionController.reset);

routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

routes.get('/connections', ConnectionsController.index);
routes.post('/connections', ConnectionsController.create);

export default routes;
