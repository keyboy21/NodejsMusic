const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Music', MusicSchema) 