const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tokenSchema = new schema({
    universityId:{
        type: String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Token',tokenSchema);