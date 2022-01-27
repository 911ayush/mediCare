const express = require('express');
const doctorRouter = require('./routes/doctorRouter.js');
const appointmentRouter = require('./routes/appointmentRouter.js');
const errorset = require('./utils/error');

const app = express();
app.use(express.json());


app.use('/api/v1/doctor',doctorRouter);
app.use('/api/v1/appointment',appointmentRouter);
app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"failed",
    //     message: `invalid url,${req.originalUrl}`
    // })
    const err = new errorset(404,"invalid url");
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(404).json({
        status:"failed",
        message: err.message
    })
})

module.exports = app;