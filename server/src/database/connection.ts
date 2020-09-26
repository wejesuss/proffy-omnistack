import knex from 'knex';
import { resolve } from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, 'database.sqlite'),
    },
    pool: {
        afterCreate: (
            conn: { run: (arg0: string, arg1: unknown) => void },
            cb: unknown
        ) => {
            conn.run('PRAGMA foreign_keys = ON', cb);
        },
    },
    useNullAsDefault: true,
});

export default db;
