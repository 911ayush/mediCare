const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');
const appointmentModel = require('./../models/appointment');


exports.addappointment = async (req, res, next) => {
    try {
        const appointment = await appointmentModel.create(req.body);
        res.status(200).json({
            status: "sucess",
            appointment
        });
    }
    catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.getappointment = async (req, res, next) => {
    try {
        console.log("reached");
        if(req.body.did){
            const doc = {
                'doctor':req.body.did
            }
            factoryhandler.getclientsAppointments(req,res,next,doc);
            return;
        }else if(req.body.pid){
            const doc = {
                'patient':req.body.pid
            }
            factoryhandler.getclientsAppointments(req,res,next,doc);
            return;
        }
        const appointment = await appointmentModel.find().select('-__v').populate({
            path: 'doctor',
            select:'-__v -passwordsetat -password -configPassword'
        });
        res.status(200).json({
            status: "sucess",
            length:appointment.length,
            appointment
        });
    }
    catch (err) {
        next(new errorset(401, err.message));
    }
}

