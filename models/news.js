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
        type: String,
        default: Date.now
    },
    penulis:{
        type: String,
        required:true
    },
    tag:{
        type: Array,
        required: false
    },
    tayang:{
        type: Number,
        required: true
    },
    komentar: [{
        nama: {
          type: String,
          required: true
        },
        isiKomentar: {
          type: String,
          required: true
        },
        tglKomentar: {
          type: String,
          default: Date.now
        }
    }]
})

module.exports = mongoose.model('News',NewsSchema)