const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();


//  schema
const userSchema = require('../Schemas/userSchema')




router.patch('/', async (req, res) => {


    if (!req.body.authToken) {
        res.status(400).send({ err: 'token is missing' })
        return
    }
    if (!req.body.userRights) {
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



    await userSchema.updateOne({ _id: req.body.userId },
        {
            $set: {
                rights: req.body.userRights
            }
        }
    )

    res.send({ success: 'updated ' })
})


module.exports = router
