const patientsmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');

exports.getpatient = factoryhandler.getclients(patientsmodel);

exports.getpatientbyid = factoryhandler.getclientbyId(patientsmodel);

exports.postpatient = factoryhandler.postclient(patientsmodel);

exports.update = factoryhandler.update(patientsmodel);

exports.uploadProfilePic = async (req,res,next) => {
    try{
        console.log(req.body);
        const patient = await patientsmodel.findById(req.body.pid);
        //console.log(patient);
        patient.profilePic = req.file.buffer;
        await patient.save();
        res.status(200).json({
            status:"success",
            patient
        })
    }catch(err){
        res.status(500).json({
            status:"failed",
            error:err
        })
    }
}