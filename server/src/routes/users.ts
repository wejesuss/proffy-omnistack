import express from 'express';

import SessionController from '../controllers/SessionController';

const routes = express.Router();

routes.post('/create', SessionController.create);
routes.post('/login', SessionController.login);
routes.post('/forgot-password', SessionController.forgot);
routes.post('/reset-password', SessionController.reset);

export default routes;
