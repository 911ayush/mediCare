const jwt = require('jsonwebtoken');
const promisify = require('promisify');
const errorset = require('./../utils/error');
const appointmentModel = require('./../models/appointment');

const tokengen = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}



//////////////////////////////////////////////////////////////////////////////////////////////////

exports.auth = (Model, d) => async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            next(new errorset(400, 'Please login again1'));
        }

        // 2) Verification token
        decode = await jwt.verify(token, process.env.JWT_SECRET);

        // 3) check if user still exist
        const user = await Model.findById(decode.id).select('+passwordsetat');
        if (!user) {
            next(new errorset(400, 'Please login again3'));
        }
        // 4) Check if user changed password after the token was issued
        if (!user.tokensetafterpasswordset(decode.iat) || decode.exp < Date.now() / 1000) {

            next(new errorset(400, 'Please login again4'));
        }
        //setting ids.
        if (d === 1) {
            req.body.did = decode.id;
        } else {
            req.body.pid = decode.id;
        }

    }
    catch (err) {
        next(new errorset(400, 'Please login again5'));
    }

    next();
}

//////////////////////////////////////////////////////////////////////////////////////////////////

exports.signupclient = Model => async (req, res) => {
    try {
        const patient = await Model.create(req.body);
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

exports.loginclient = Model => async (req, res, next) => {
    try {
        const email = req.body.email;
        const doc = await Model.findOne({ email }).select('+password');
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



exports.getclients = Model => async (req, res, next) => {
    try {
        const doc = Model.find(req.query).select('-__v  -passwordsetat -password -configPassword');
        console.log(req.query);
        if (req.query.page && req.query.limit) {

            doc.skip((req.query.page - 1) * (req.query.limit * 1)).limit(req.query.limit * 1);
        }

        const u = await doc;
        res.status(200).json({
            status: "sucess",
            doctors_length: u.length,
            data: u
        })
    } catch (err) {
        next(new errorset(401, 'cannot find data'));
    }
}


exports.getclientbyId = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id).select('-__v -passwordsetat -password -configPassword');
        res.status(200).json({
            status: "sucess",
            data: doc
        })
    } catch (err) {
        next(new errorset(401, 'invalid id'));
    }
}


exports.postclient = Model => async (req, res, next) => {
    try {
        console.log(req.body);
        const doc = await Model.create(req.body);
        res.status(200).json({
            status: "sucess",
            doc
        })
    } catch (err) {
        next(new errorset(401, err.message));
    }
}


exports.update = Model => async (req, res, next) => {
    try {
        console.log("reached");
        let id;
        if (req.body.did) {
            id = req.body.did;
        } else if (req.body.pid) {
            id = req.body.pid;
        }
        const doc = await Model.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "sucess",
            doc
        });
    } catch (err) {
        next(new errorset(401, err.message));
    }
}

////////////////////////////////
exports.getclientsAppointments = async (req,res,next,doc) => {
    try{
        console.log(doc);
        
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


