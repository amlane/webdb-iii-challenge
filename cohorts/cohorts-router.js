const router = require('express').Router();

const Cohorts = require('./cohorts-model.js');

router.get('/', (req, res) => {
    Cohorts.find()
    .then( cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id', verifyId, (req, res) => {
    const id = req.params.id;

    Cohorts.findById(id)
    .then( cohort => {
        res.status(200).json(cohort)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({ message: "Cohort Name is required" })
    } else {
        Cohorts.insert(req.body)
    .then(cohort => {
        res.status(201).json(cohort)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    }
});

router.put('/:id', verifyId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    const { name } = req.body;
    if(!name){
        res.status(400).json({ message: "Cohort Name is required" })
    } else {
        Cohorts.update(id, changes)
        .then(updatedCohort => {
            res.status(201).json(updatedCohort)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
});

router.delete('/:id', verifyId, (req, res) => {
    const id = req.params.id;

    Cohorts.remove(id)
    .then(deletedCohort => {
        res.status(200).json({ message: `Item deleted! Huzzah!` });
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id/students', verifyId, (req, res) => {
    const id = req.params.id;

    Cohorts.findStudentsByCohort(id)
    .then( students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


// Custom Middleware

//checks if id exists in the database
function verifyId(req, res, next){
    const id = req.params.id;

    Cohorts.findById(id)
    .then(item => {
        if(item){
            req.item = item;
            next();
        } else {
            res.status(404).json({ message: "Cohort Not Found." })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
};


module.exports = router;