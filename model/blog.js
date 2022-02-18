const mongoose = require('mongoose');   

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    doc: {
        type:String,
        required: true
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    tag: {
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model('Blog',blogSchema)
