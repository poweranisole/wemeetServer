const mongoose = require('mongoose')

const newDate = new Date();

const attendSchema = new mongoose.Schema({

    username: {
        type: String,
        uniquie: true
    },
    attendDate: {
        type: String,
        default: ((new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())).toUTCString())
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('attendance', attendSchema)