const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        uniquie: true
    },
    password: {
        type: String,
        uniquie: true
    },
    profilePic: {
        type: String,
        uniquie: true
    },
    rights: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)