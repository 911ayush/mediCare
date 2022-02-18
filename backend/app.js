const express = require('express');
const doctorRouter = require('./routes/doctorRouter.js');
const patientRouter = require('./routes/patientRouter.js');
const appointmentRouter = require('./routes/appointmentRouter.js');
const messagingRouter = require('./routes/messageRouter.js');
const documentRouter = require('./routes/documentRouter');
<<<<<<< HEAD
const notificationRouter = require('./routes/notificationRouter');
=======
const ambulanceRouter = require('./routes/ambulanceRouter');
>>>>>>> 0d3ffd99fd88d822e2602d0fbe37649a74cbcfcb

const errorset = require('./utils/error');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/doctor',doctorRouter);
app.use('/api/v1/patient',patientRouter);
app.use('/api/v1/appointment',appointmentRouter);
app.use('/api/v1/messenger',messagingRouter);
app.use('/api/v1/document',documentRouter);
<<<<<<< HEAD
app.use('/api/v1/notification',notificationRouter);
=======
app.use('/api/v1/ambulance',ambulanceRouter);
>>>>>>> 0d3ffd99fd88d822e2602d0fbe37649a74cbcfcb
app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"failed",
    //     message: `invalid url,${req.originalUrl}`
    // })
    const err = new errorset(404,`invalid url 1${req.url}`);
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(404).json({
        status:"failed",
        message: err.message
    })
})

module.exports = app;