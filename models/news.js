const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema({
    judul:{
        type: String,
        required: true
    },
    kategori:{
        type: String,
        required: true
    },
    gambarberita:{
        type: String,
        required: false
    },
    isiBerita:{
        type: String,
        required: true 
    },
    tglCreate:{
        type: Date,
        default: Date.now
    },
    tag:{
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('News',NewsSchema)