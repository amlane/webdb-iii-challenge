const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, 
    insert,
    findById,
    update,
    remove, 
    findStudentsByCohort
};

function find() {
    return db('cohorts');
};

function findById(id){
    return db('cohorts')
    .where({ id })
    .first();
};

function insert(cohort) {
    return db('cohorts')
    .insert(cohort);
};

function update(id, changes) {
    return db('cohorts')
    .where({ id })
    .update(changes)
};

function remove(id) {
    return db('cohorts')
    .where({ id })
    .delete();
};

function findStudentsByCohort(cohortId){
    return db('students')
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select('students.id', 'students.studentName', 'cohorts.name as cohort')
    .where('students.cohort_id', cohortId)
}