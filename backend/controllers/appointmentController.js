const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');
const appointmentModel = require('./../models/appointment');
const documentModel = require('./../models/documents/document');
const hiddenNote = require('./../models/documents/hiddennotes');

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
        if (req.body.did) {
            const doc = {
                'doctor': req.body.did
            }
            factoryhandler.getclientsAppointments(req, res, next, doc);
            return;
        } else if (req.body.pid) {
            const doc = {
                'patient': req.body.pid
            }
            factoryhandler.getclientsAppointments(req, res, next, doc);
            return;
        }
        const appointment = await appointmentModel.find().select('-__v').populate({
            path: 'doctor',
            select: '-__v -passwordsetat -password -configPassword'
        });
        res.status(200).json({
            status: "sucess",
            length: appointment.length,
            appointment
        });
    }
    catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.getdocument = async (req, res, next) => {
    try {
        const appointmentid = req.params.appointmentid;

        const app = await appointmentModel.findById(appointmentid);

        if (app) {
            let query = {
                appointmentid,
            }
            console.log(req.query.all === 'true');
            if (req.query.all && req.query.all === 'true') {

                query = {
                    patientid: app.patient,
                }
            } else {
                query = {
                    appointmentid,
                }
            }
            const documents = await documentModel.find(query).select('-document');
            if (app.doctor.toString() === req.body.did) {
                res.status(200).json({
                    status: "success",
                    results: documents.length,
                    documents
                });
                return;
            }
        }
        next(new errorset(400, 'you are not authorized for this request'));
    } catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.postdocument = async (req, res, next) => {
    try {
        const appointmentid = req.params.appointmentid;
        const app = await appointmentModel.findById(appointmentid);
        if (app) {
            if (app.doctor.toString() === req.body.did) {

                const document = {
                    name: req.body.name,
                    document: req.file.buffer,
                    patientid: app.patient.toString(),
                    appointmentid,
                    uploadedBy: req.body.did
                }

                const documents = await documentModel.create(document);
                res.status(200).json({
                    status: "success",
                    documents
                });
                return;
            }
        }
        next(new errorset(400, 'you are not authorized for this request'));
    } catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.posthiddenNote = async (req, res, next) => {
    try {
        const document = {
            hiddenNote: req.body.hiddenNote,
            conversationid: req.params.conversationid
        }
        const documents = await hiddenNote.create(document);
        res.status(200).json({
            status: "success",
            documents
        });
    } catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.gethiddenNote = async (req, res, next) => {
    try {
        const conversationid = req.params.conversationid; 
        const documents = await hiddenNote.find({conversationid});
        // const documents = await hiddenNote.find({conversationid}).populate('conversationid');
        // console.log(documents.conversationid)
        res.status(200).json({
            status: "success",
            documents
        });
    } catch (err) {
        next(new errorset(401, err.message));
    }
}