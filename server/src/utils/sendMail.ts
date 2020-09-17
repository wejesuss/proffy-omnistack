import transport from '../modules/mailer';
import { createMail } from '../services';

type CreateEmail = {
    baseText: string;
    replacers: string[];
    placeholder?: string;
};

type Email = CreateEmail | { emailReady: string };

interface MailOptions {
    from: string;
    to: string;
    subject?: string;
}

interface Mail {
    email: Email;
    options: MailOptions;
}

export default ({ email, options: { from, subject, to } }: Mail): void => {
    let html: string;

    if ('emailReady' in email) {
        html = email.emailReady;
    } else {
        html = createMail(
            {
                baseText: email.baseText,
                replacers: email.replacers,
            },
            email.placeholder
        );
    }

    transport.sendMail({
        from,
        to,
        subject,
        html,
    });
};
