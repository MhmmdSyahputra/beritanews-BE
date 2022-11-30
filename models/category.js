const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    nameKategory:{
        type: String,
        required: true
    },
    gambarKategory:{
        type: String,
        required: true
    },
    keteranganKategory:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Category',CategorySchema)