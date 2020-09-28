import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
        table.string('passwordResetToken');
        table.date('passwordResetExpires');
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('users');
}
