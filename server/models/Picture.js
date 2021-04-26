const mongoose = require('mongoose')
const User=require('./User')

const pictureSchema = mongoose.Schema({
    
    date: {
        type: String,
    },
    explanation: {
        type: String
    },
    hdurl:{
        type: String
    },
    media_type: {
        type: String
    },
    service_version: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


})
// blogSchema.pre('remove', async function (next) {
//     let user = await User.findOne({ _id: this.userId })

//     user.blogs.pull({ _id: this._id })
//     next()
// })

// blogSchema.post('save', async function (next) {
//     console.log("post save");
// })

module.exports = mongoose.model('Picture', pictureSchema)