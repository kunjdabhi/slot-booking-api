const express = require("express");
const router = express.Router();
const {deanRegister, deanLogin}  = require('../Controller/deanAuthController');
const {getSlots, postSlots} = require('../Controller/deanSlotController');
const { isAuth } = require("../Middlewares/isAuth");

router.post('/register', deanRegister);
router.post('/login', deanLogin);
router.get('/slots',isAuth, getSlots);
router.post('/slots',isAuth, postSlots);

module.exports = router;