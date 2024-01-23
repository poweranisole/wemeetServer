const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const userSchema = require('../Schemas/userSchema')
const meetSchema = require('../Schemas/meetSchema')




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
    if (userDetail.rights != "admin") {
        res.status(403).send({ err: 'User Not allowed' })
        return;
    }



    await meetSchema.create({
        host: userDetail.username,
        hostId: userDetail._id,
        hostProfilePic: userDetail.profilePic,
        meetName: req.body.meetName
    })


    res.send({ success: 'Meeting Created' })


})


module.exports = router
