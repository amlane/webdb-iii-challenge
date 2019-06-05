const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/banana.db3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

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