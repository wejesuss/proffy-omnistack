import express from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const routes = express.Router();

routes.get('/', ConnectionsController.index);
routes.post('/', ConnectionsController.create);

export default routes;
