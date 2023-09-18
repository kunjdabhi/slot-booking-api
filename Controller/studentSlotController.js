const Slot = require('../Model/Slot');
const Student = require('../Model/Student');
const Dean = require('../Model/Dean');
const moment = require('moment-timezone');
const BookedSlot = require('../Model/BookedSlots');
const BookedSlots = require('../Model/BookedSlots');
const getSlots = async(req,res)=>{
    
    try{
        const slots = await Slot.find();
        return res.status(200).json(slots);
    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
    
}

const bookSlot = async(req,res)=>{
    const slotId = req.params.slotId;
    const universityId = req.id;
    const {date} = req.body;
    const bookingDate = moment(date);
    try{
        const student = await Student.findOne({universityId});
        const slot = await Slot.findOne({slotId});

        bookingDate.hour(parseInt(slot.startTime.substring(0,2)))
        bookingDate.minutes(bookingDate.minutes() + 330);

        if(!student || !slot) {
            throw new Error("Something went wrong");
        }
        if(bookingDate.day() !== 4 && bookingDate.day() != 5){
            throw new Error("Dean is only available on thursday and friday");
        }

        const alreadyBooked = await BookedSlots.find({bookingDate});
        if(alreadyBooked.length >= 1){
            throw new Error("Slot is already booked");
        }
        const bookedSlot = await BookedSlot.create({
            slot:slot._id,
            bookingDate,
            bookedBy:student.name
        })

        const student2 = await Student.findByIdAndUpdate(student._id,{
            $push:{boookedSlots: slot._id}
        })
        

        const assignedSlot={
            slotId:slot._id,
            bookedBy:student.name
        }


        return res.status(200).json({
            msg:`Slot from ${slot.startTime} to ${slot.endTime} on ${date} booked successfully`
        });
        

    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}



module.exports = {getSlots, bookSlot};