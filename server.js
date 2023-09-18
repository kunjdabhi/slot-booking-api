const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const studentRouter = require('./Routes/studentRouter');
const deanRouter = require('./Routes/deanRouter');
app.use(express.json())
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, ()=>{
        console.log("listening on " + process.env.PORT);
    })
})

app.use('/user/student/', studentRouter);
app.use('/user/dean/', deanRouter);