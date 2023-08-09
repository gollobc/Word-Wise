const express = require('express')
const router = express.Router()


const db = require('../models')

/* Routes -------------------------------*/
//Index Route
router.get('/', function (req,res) {
    db.Collection.find({})
        .then(collections => res.json(collections))
})

//Create Route takes POST and creates new comment doc using req body
router.post('/', (req,res) => {
    console.log(req.body)
    db.Collection.create(req.body)
        .then(collection => res.json(collection))
})

//Update Route recieves PUT 
router.put('/:id', (req,res) => {
    db.Collection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(collection => res.json(collection))
})

router.delete('/:id', (req,res) => {
    db.Collection.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletecollectionId: req.params.id }))
})

module.exports = router