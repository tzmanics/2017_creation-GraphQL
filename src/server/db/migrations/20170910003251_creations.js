exports.up = (knex, Promise) => {
  return knex.schema.createTable('creations', (table) => {
    table.increments();
    table.string('title').notNullable().unique();
    table.string('description').notNullable();
    table.string('materials').notNullable();
    table.string('image').notNullable();
    table.string('category').notNullable();
  })
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTable('creations'); 
};
