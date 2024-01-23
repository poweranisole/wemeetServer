const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const userSchema = require('../Schemas/userSchema')
const attendSchema = require('../Schemas/attendSchema')




router.post('/', async (req, res) => {


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

    if (userDetail.rights != 'admin') {
        res.status(403).send({ err: "User don't have Rights" })
        return;
    }

    const newDate = new Date(req.body.dateTime);





    const userList = await attendSchema.find({
        attendDate: ((new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1)).toUTCString())
    })



    res.send({ userList })







})


module.exports = router
