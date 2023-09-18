const mongoose = require('mongoose');

const schema = mongoose.Schema;

const deanSchema = new schema({
    universityId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String ,
        required:true
    }
})


module.exports = mongoose.model('Dean', deanSchema)