const Slot = require('../Model/Slot');
const Student = require('../Model/Student');
const Dean = require('../Model/Dean');
const moment = require('moment')
const BookedSlot = require('../Model/BookedSlots')
const getSlots = async(req,res)=>{
    try{
        const date = moment();
        const slots = await BookedSlot.find({bookingDate:{$gt: date}}).populate({
            path:'slot'
        });
        return res.status(200).json(slots);
    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
    
}
const postSlots = async(req, res)=>{
    const body = req.body;
    try{
        const slot = await Slot.create(body);
        return res.status(200).json(slot);

    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

module.exports = {getSlots, postSlots};
