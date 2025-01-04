// up.js
import knex from 'knex';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('fullname');
    table.string('email').unique();  // Ensure the email is unique
    table.string('password');
    table.string('phone');
    table.enum("work_status", ["EXPERIENCED", "FRESHER"]);
    table.integer('batch');
    table.enum('status', ["STUDENT", "ALUMNI"]);
    table.text('resume');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('users');
}
