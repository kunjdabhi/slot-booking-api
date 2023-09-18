const { mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    universityId:{
        type:String,
        required:true,
    },
    name:{
        type : String ,
        required:true
    },
    password:{
        type:String,
        required:true
    },  
    boookedSlots:[{type:mongoose.Schema.Types.ObjectId, ref:"Slot"}],
})

module.exports = mongoose.model('Student', studentSchema);