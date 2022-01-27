const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error');

exports.getdoctors = async (req, res,next) => {
    try {
        const doc = docmodel.find(req.query).select('-__v -passwordsetat -password -configPassword');
        console.log(req.query);
        if(req.query.page && req.query.limit){

            doc.skip((req.query.page-1)*(req.query.limit*1)).limit(req.query.limit*1);
        }
        
        const u = await doc;
        res.status(200).json({
            status: "sucess",
            doctors_length: u.length,
            data: u
        })
    } catch (err) {
        next( new errorset(401,'cannot find data'));
    }
}

exports.getdoctorsbyid = async (req, res,next) => {
    try {
        const doc = await docmodel.findById(req.params.id).select('-__v -passwordsetat -password -configPassword');
        res.status(200).json({
            status: "sucess",
            data: doc
        })
    } catch (err) {
        next( new errorset(401,'invalid id'));
    }

}

exports.postdoctors = async (req, res, next) => {
    try {
        const doc = await docmodel.create(req.body);
        res.status(200).json({
            status: "sucess",
            doc
        })
    } catch (err) {
        next( new errorset(401,err.message));
    }
}

exports.update = async (req, res,next) => {
    try {
        const doc = await docmodel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "sucess",
            doc
        });
    } catch (err) {
        next( new errorset(401,err.message));
    }
}