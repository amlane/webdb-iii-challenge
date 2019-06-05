const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./cohorts/cohorts-router.js');
const studentsRouter = require('./students/students-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.get('/', (req, res) => {
    res.send('Hello')
})

const port = 4200;

server.listen(port, function() {
    console.log(`\n *** Service is running on localhost:${port} *** \n`)
})