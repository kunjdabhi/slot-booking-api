const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookedSlotSchema = new schema({
    slot:{type:mongoose.Schema.Types.ObjectId, ref:"Slot"},
    bookingDate:Date,
    bookedBy:String,

})

module.exports = mongoose.model('BookedSlot', bookedSlotSchema)