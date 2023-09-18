const express = require('express');
const router = express.Router();
const {registerStudent, loginStudent} = require('../Controller/studentAuthContoller');
const {getSlots, bookSlot} = require('../Controller/studentSlotController');
const {isAuth} = require('../Middlewares/isAuth');


router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/slots', isAuth, getSlots);
router.post('/slots/:slotId', isAuth, bookSlot);

module.exports = router;