const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const userSchema = require('../Schemas/userSchema')
const meetSchema = require('../Schemas/meetSchema')




router.patch('/', async (req, res) => {


    if (!req.body.authToken) {
        res.status(400).send({ err: 'token is missing' })
        return
    }
    if (!req.body.meetId) {
        res.status(400).send({ err: 'Info is missing' })
        return
    }

    const decodedData = await jwt.verify(req.body.authToken, process.env.SECRET)


    const userDetail = await userSchema.findOne({ _id: decodedData.userId }).select('-password')

    if (!userDetail) {
        res.status(403).send({ err: 'User Not Found' })
        return;
    }

    if (userDetail.rights != 'admin') {
        res.status(403).send({ err: 'User Not Alowwed ' })
        return;
    }

    await meetSchema.updateOne({ _id: req.body.meetId },
        {
            $set: {
                usersList: req.body.usersList
            }
        }
    )






    await meetSchema.updateOne({ _id: req.body.meetId },
        {
            $set: {
                active: false
            }
        }
    )

    res.send({ success: 'Deleted ' })
})


module.exports = router
