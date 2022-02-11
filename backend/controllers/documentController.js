const errorset = require('./../utils/error');
const documentModel = require('./../models/documents/document');

exports.getmydocument = async (req, res, next) => {
    try {
        const query = {
            patientid: req.body.pid
        }
        if(req.body.name){
            query.name = req.body.name;
        }
        if(req.body.appointmentid){
            query.appointmentid = req.body.appointmentid;
        }
        const document = await documentModel.find(query);
        res.status(200).json({
            status: "success",
            results: document.length,
            document
        })
    } catch (err) {
        next(new errorset(401, err.message));
    }
}

exports.postmydocument = async (req, res, next) => {
    try {
        console.log(req.file);
        const doc = {
            name: req.body.name,
            document: req.file.buffer,
            patientid: req.body.pid,
            appointmentid: req.body.appointmentid ? req.body.appointmentid : null,
        }
        console.log(doc);
        const document = await documentModel.create(doc);
        res.status(200).json({
            status: "success",
            document
        })
    } catch (err) {
        next(new errorset(401, err.message));
    }
}