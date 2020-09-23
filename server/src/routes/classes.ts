import express from 'express';

import ClassesController from '../controllers/ClassesController';

const routes = express.Router();

routes.get('/', ClassesController.index);
routes.post('/', ClassesController.create);

export default routes;
