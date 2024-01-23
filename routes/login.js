const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router();

const userSchema = require('../Schemas/userSchema')



router.post('/', async (req, res) => {



    const data = await userSchema.findOne({ username: req.body.username })


    if (!data) {
        res.status(403).send({ err: 'Invalid Credentials' })
        return
    }

    const result = await bcrypt.compare(req.body.password, data.password)
    if (!result) {
        res.status(403).send({ err: 'Invalid Credentials' })
        return
    }


    const authToken = jwt.sign({
        userId: data._id
    }, process.env.SECRET)





    res.send({
        authToken, userDetail: {
            ...data,
            password: undefined
        }
    })
})



module.exports = router