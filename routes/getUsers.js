const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()




const userSchema = require('../Schemas/userSchema')



router.post('/', async (req, res) => {


    if (!req.body.authToken) {
        res.status(401).send({ err: 'token is missing' })
        return
    }

    const decodedData = await jwt.verify(req.body.authToken, process.env.SECRET)

    if (!decodedData) {
        res.status(403).send({ err: 'Invalid Token' })
        return;
    }

    const result = await userSchema.findOne({ _id: decodedData.userId }).select('-password')



    // console.log(result, decodedData.userId)
    if (!result || (result.rights == 'user')) {
        res.status(403).send({ err: "You don't have privileges " })
        return;
    }


    const userList = await userSchema.find({}).select('-password')


    res.status(200).send({ userList })



})





module.exports = router
