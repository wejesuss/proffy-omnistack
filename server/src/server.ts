import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { resolve } from 'path';

import routes from './routes';
import getMyIPAddress from './utils/getMyIpAddress';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.static(resolve(__dirname, '..', 'public')));
dotenv.config({
    path: resolve(__dirname, '..', '.env'),
});
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(
        `Server is running on port ${port} with the IP address ${
            getMyIPAddress('Wi-Fi').address
        }`
    );
});
