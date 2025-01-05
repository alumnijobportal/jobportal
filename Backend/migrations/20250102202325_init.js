/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("companies", (table) => {
    table.increments("id").primary();
    table.string("company_name");
    table.string("company_url");
    table.string("company_address");
    table.string("user_id");
    table.enum('industry_type',["Technology","Finance","Healthcare","Education","Retail","Manufacturing","Other"])
    table.string("user_designation");
    table.integer("number_of_employees");
    table.text("company_description_pdf");
    table.text("company_logo");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("companies");
}
