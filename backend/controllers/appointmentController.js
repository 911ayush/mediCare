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
        const appointment = await appointmentModel.find().populate('doctor');
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