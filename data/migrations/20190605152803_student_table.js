
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl){
        // primary key: id, autoincrements, integer
        tbl.increments();
  
        // name: text, required, 128 character limit just cuz
        tbl.string('studentName', 128)
        .notNullable()

        // foreign key
        tbl.integer('cohort_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
