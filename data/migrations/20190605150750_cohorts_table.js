
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl){
      // primary key: id, autoincrements, integer
      tbl.increments();

      //name: text, required, 128 character limit just cuz
      tbl.string('name', 128)
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('cohorts');
};
