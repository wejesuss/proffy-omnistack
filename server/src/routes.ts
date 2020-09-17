import express from 'express';

import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

routes.post('/users/create', UsersController.create);
routes.post('/users/login', UsersController.login);
routes.post('/users/forgot-password', UsersController.forgot);
routes.post('/users/reset-password', UsersController.reset);

routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

routes.get('/connections', ConnectionsController.index);
routes.post('/connections', ConnectionsController.create);

export default routes;
