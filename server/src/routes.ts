import express from 'express';

import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

routes.post('/users/create', UsersController.create);
routes.post('/users/login', UsersController.login);

routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

routes.get('/connections', ConnectionsController.index);
routes.post('/connections', ConnectionsController.create);

export default routes;
