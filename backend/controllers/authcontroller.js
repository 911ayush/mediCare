const jwt = require('jsonwebtoken');
const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error.js');
const promisify = require('promisify');

const tokengen = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.protect = async (req, res, next) => {

    try {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            next(new errorset(400, 'Please login again'));
        }

        // 2) Verification token
        //const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
       // console.log(token);
        let decode = await jwt.verify(token, process.env.JWT_SECRET);
       // console.log(decode);
        const user = await docmodel.findById(decode.id);
        if (!user) {
            next(new errorset(400, 'Please login again'));
        }
        // 4) Check if user changed password after the token was issued
        if (!user.tokensetafterpasswordset(decode.iat)||decode.exp<Date.now()/1000) {
            
            next(new errorset(400, 'Please login again'));
        }




    } catch (err) {
        next(new errorset(400, 'Please login again'));
    }

    next();
}


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