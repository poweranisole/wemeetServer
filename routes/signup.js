const express = require('express')
const multer = require('multer')
const bcrypt = require('bcrypt');
const fs = require('fs')
const jwt = require('jsonwebtoken');

const router = express.Router()
const saltRounds = 15;





// schema 
const userSchema = require('../Schemas/userSchema')





// multer upload 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: async (req, file, cb) => {


        req.profilePic = `${req.body.username}-${Date.now()}.${file.originalname.split('.').at(-1)}`

        cb(null, req.profilePic)
    }
})

const upload = multer({ storage })





router.put('/', upload.single('profilePic'), async (req, res) => {





    let result = await userSchema.findOne({ username: req.body.username })


    if (result) {
        setTimeout(() => {
            console.log('removed ', req.profilePic)
            fs.unlinkSync(`./uploads/${req.profilePic}`)
        }, 1000);
        res.send({ err: 'username Already Exists' })
        return;
    }

    const passHash = await bcrypt.hash(req.body.password, saltRounds);

    result = await userSchema.create({
        username: req.body.username,
        password: passHash,
        profilePic: req.profilePic
    })



    const authToken = jwt.sign({
        userId: result._id
    }, process.env.SECRET)



    res.send({
        authToken, userDetail: {
            ...result,
            password: null
        }
    })
})


module.exports = router