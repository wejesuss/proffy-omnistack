import { createTransport } from 'nodemailer';
import {
    EMAIL_PORT as port,
    AUTH_EMAIL_PASS as pass,
    AUTH_EMAIL_USER as user,
} from '../utils/config';

const transport = createTransport({
    host: 'smtp.mailtrap.io',
    port,
    auth: { user, pass },
});

export default transport;
