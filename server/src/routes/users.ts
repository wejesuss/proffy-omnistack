import express from 'express';

import UsersController from '../controllers/UsersController';
import SessionController from '../controllers/SessionController';

const routes = express.Router();

routes.get('/search', UsersController.search);
routes.post('/create', UsersController.create);
routes.put('/edit', UsersController.edit);

routes.post('/login', SessionController.login);
routes.post('/forgot-password', SessionController.forgot);
routes.post('/reset-password', SessionController.reset);

export default routes;
