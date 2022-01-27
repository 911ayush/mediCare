const jwt = require('jsonwebtoken');
const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error.js');

const tokengen = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.protect = async (req,res,next) => {
    // 1) Getting token and check of it's there
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        console.log("yes");
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
    }else{
        //creating bearer token missing error
    }
  // 2) Verification token

  // 3) Check if user still exists

  // 4) Check if user changed password after the token was issued
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

exports.logindoc = async (req, res) => {
    try {
        const email = req.body.email;
        const doc = await docmodel.findOne({ email });
        console.log(doc.password);
        const tp = await doc.checkpassword(doc.password, req.body.password);
        console.log(tp);
        if(!doc || !tp){
            res.status(401).json({
                status: "failed",
                err:"error"
            })
            return;
        }
        const token = tokengen(doc._id);
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