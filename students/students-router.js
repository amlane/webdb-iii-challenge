const router = require('express').Router();

const Students = require('./students-model.js');

router.get('/', (req, res) => {
    Students.find()
    .then( student => {
        res.status(200).json(student)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id', verifyId, (req, res) => {
    const id = req.params.id;

    Students.findById(id)
    .then( student => {
        res.status(200).json(student)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    const { studentName, cohort_id } = req.body;
    if(!studentName || !cohort_id){
        res.status(400).json({ message: "Student Name and Cohort ID is required." })
    }

    Students.insert(req.body)
    .then(student => {
        res.status(201).json(student)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.put('/:id', verifyId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Students.update(id, changes)
    .then(updatedStudent => {
        res.status(201).json(updatedStudent)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/:id', verifyId, (req, res) => {
    const id = req.params.id;

    Students.remove(id)
    .then(deletedStudent => {
        const unit = deletedStudent > 1 ? "records" : "record";
        res.status(200).json({ message: `${deletedStudent} ${unit} deleted.` });
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


// Custom Middleware

//checks if id exists in the database
function verifyId(req, res, next){
    const id = req.params.id;

    Students.findById(id)
    .then(item => {
        if(item){
            req.item = item;
            next();
        } else {
            res.status(404).json({ message: "Student Not Found." })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
};


module.exports = router;