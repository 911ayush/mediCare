const jwt = require('jsonwebtoken');
const docmodel = require('./../models/doctorsmodel');
const patientmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error.js');
const promisify = require('promisify');
const catchAsync = require('./../utils/catchAsync');
const tokengen = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
const checkandgettokenid =  async (req,res) =>{
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            next(new errorset(400, 'Please login again1'));
        }

        // 2) Verification token
        let decode = await jwt.verify(token, process.env.JWT_SECRET);
        return decode;

    }catch(err){
        return(new errorset(400, 'Please login again2'));
    }
}
exports.dauth = async (req, res, next) => {

    try {
        // 1) Getting token and check of it's there
        const decode = await checkandgettokenid(req,res);
        const user = await docmodel.findById(decode.id);
        if (!user) {
            next(new errorset(400, 'Please login again3'));
        }
        // 4) Check if user changed password after the token was issued
        if (!user.tokensetafterpasswordset(decode.iat)||decode.exp<Date.now()/1000) {
            
            next(new errorset(400, 'Please login again4'));
        }
        req.body.did = decode.id;
    } catch (err) {
        next(new errorset(400, 'Please login again5'));
    }

    next();
}

exports.pauth = async (req, res, next) => {

    try {
        // 1) Getting token and check of it's there
        const decode = await checkandgettokenid(req,res);

        const user = await patientmodel.findById(decode.id).select('passwordsetat');

        if (!user) {
            next(new errorset(400, 'Please login again3'));
        }

        // 4) Check if user changed password after the token was issued

        if (!user.tokensetafterpasswordset(decode.iat)||decode.exp<Date.now()/1000) {
            next(new errorset(400, 'Please login again4'));
        }

        req.body.pid = decode.id;
        
    } catch (err) {
        next(new errorset(400, 'Please login again5'));
    }

    next();
}

//AUTH OF PATIENTS
exports.signuppatient = async (req, res) => {
    try {
        const patient = await patientmodel.create(req.body);
        const token = tokengen(patient._id);
        // patient.checkPass
        res.status(200).json({
            status: "sucess",
            token,
            patient
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }
}

exports.loginpatient = async (req, res, next) => {
    try {
        const email = req.body.email;
        const patient = await patientmodel.findOne({ email }).select('password');
        const tp = await patient.checkpassword(patient.password, req.body.password);
        console.log(tp);
        if (!patient || !tp) {
            next(new errorset(401, 'invalid password'));
        }
        const token = tokengen(patient._id);
        res.status(200).json({
            status: "sucess",
            token,
            patient
        })
    } catch (err) {
        next(new errorset(401, err.message));

    }
}


//AUTH OF DOCTORS

exports.signupdoc = async (req, res) => {
    try {
        const doc = await docmodel.create(req.body);
        const token = tokengen(doc._id);
        // doc.checkPass
        res.status(200).json({
            status: "sucess",
            token,
            doc
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }
}

exports.logindoc = async (req, res, next) => {
    try {
        const email = req.body.email;
        const doc = await docmodel.findOne({ email });
        console.log(doc.password);
        const tp = await doc.checkpassword(doc.password, req.body.password);
        console.log(tp);
        if (!doc || !tp) {
            next(new errorset(401, 'invalid password'));
        }
        const token = tokengen(doc._id);
        res.status(200).json({
            status: "sucess",
            token,
            doc
        })
    } catch (err) {
        next(new errorset(401, err.message));

    }
}