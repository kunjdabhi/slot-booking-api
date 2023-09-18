const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const slotSchema = new Schema({
    slotId:{
        type:Number,
        required:true,
        unique:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('Slot', slotSchema);