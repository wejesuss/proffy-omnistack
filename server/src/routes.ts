import express from 'express';

import users from './routes/users';
import classes from './routes/classes';
import connections from './routes/connections';

const routes = express.Router();

routes.use('/users', users);
routes.use('/classes', classes);
routes.use('/connections', connections);

export default routes;
