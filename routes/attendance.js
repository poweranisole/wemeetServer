const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const userSchema = require('../Schemas/userSchema')
const attendSchema = require('../Schemas/attendSchema')




router.put('/', async (req, res) => {


    if (!req.body.authToken) {
        res.status(400).send({ err: 'token is missing' })
        return
    }

    const decodedData = await jwt.verify(req.body.authToken, process.env.SECRET)


    const userDetail = await userSchema.findOne({ _id: decodedData.userId }).select('-password')

    if (!userDetail) {
        res.status(403).send({ err: 'User Not Found' })
        return;
    }


    const newDate = new Date();





    const result = await attendSchema.findOne({
        username: userDetail.username,
        attendDate: ((new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1)).toUTCString())
    })


    if (result) {


        res.send({ note: 'Attendance Already Done' })
        return;
    }


    await attendSchema.create({
        username: userDetail.username,
        attendDate: ((new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())).toUTCString())
    })


    res.send({ success: 'Today Attendance Done' })





})


module.exports = router
