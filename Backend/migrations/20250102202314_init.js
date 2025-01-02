/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments('id').primary()
        table.string('fullname')
        table.string('email')
        table.string('password')
        table.string('phone')
        table.enum("work_status",["EXPERIENCED","FRESHER"])
        table.integer('batch')
        table.enum('status',["STUDENT","ALUMNI"])
        table.text('resume')



    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
  
};
