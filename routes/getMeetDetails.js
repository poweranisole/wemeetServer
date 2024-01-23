const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const meetSchema = require('../Schemas/meetSchema')




router.post('/', async (req, res) => {



    if (!req.body.meetId) {
        res.status(400).send({ err: 'Info is missing' })
        return
    }






    const meetDetails = await meetSchema.findOne({ _id: req.body.meetId })

    if (!meetDetails) {
        res.status(404).send({ err: 'Meeting not found' })
        return;
    }
    res.send({ meetDetails })
})


module.exports = router
