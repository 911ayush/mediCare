const appointmentModel = require('./../models/appointment');
const errorset = require('./../utils/error');

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
        if(req.body.did){
            this.getdocAppointments(req,res,next);
            return;
        }else if(req.body.pid){
            this.getpatientAppointments(req,res,next);
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

exports.getdocAppointments = async (req,res,next) => {
    try{
        const id = req.body.did;
        const doc = {
            doctor:id
        }
        const appointment = await appointmentModel.find(doc);
        res.status(200).json({
            status: 'sucess',
            results:appointment.length,
            appointment
        })
    }catch(err){
        next(new errorset(401,err.message));
    }
}

exports.getpatientAppointments = async (req,res,next) => {
    try{
        const id = req.body.pid;
        const doc = {
            patient:id
        }
        const appointment = await appointmentModel.find(doc);
        res.status(200).json({
            status: 'sucess',
            results:appointment.length,
            appointment
        })
    }catch(err){
        next(new errorset(401,err.message));
    }
}