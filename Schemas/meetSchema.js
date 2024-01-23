const mongoose = require('mongoose')


const attendSchema = new mongoose.Schema({

    host: {
        type: String,
    },
    hostId: {
        type: String,
    },
    hostProfilePic: {
        type: String,
    },
    meetName: {
        type: String,
    },
    usersList: {
        type: Array,
        default: []
    },
    active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('meet', attendSchema)