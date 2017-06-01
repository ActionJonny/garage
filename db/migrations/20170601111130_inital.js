
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('model', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('reason').notNullable();
      table.string('cleanliness').notNullable();

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('model'),
  ]);
};
