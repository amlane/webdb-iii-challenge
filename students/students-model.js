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
    return db('students');
};

function findById(id){
    return db('students')
    .where({ id })
    .first();
};

function insert(student) {
    return db('students')
    .insert(student);
};

function update(id, changes) {
    return db('students')
    .where({ id })
    .update(changes)
};

function remove(id) {
    return db('students')
    .where({ id })
    .delete();
};