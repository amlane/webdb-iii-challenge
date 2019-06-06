
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {studentName: 'Amanda',  cohort_id: 3},
        {studentName: 'Javontay', cohort_id: 2},
        {studentName: 'Taslim', cohort_id: 1}
      ]);
    });
};