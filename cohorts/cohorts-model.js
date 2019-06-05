const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, 
    insert,
    findById,
    update,
    remove
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