const express = require('express')
const router = express.Router()




const meetSchema = require('../Schemas/meetSchema')



router.get('/', async (req, res) => {



    const meetingList = await meetSchema.find({}).sort({ createdAt: -1 })


    res.send({ meetingList })




})





module.exports = router
