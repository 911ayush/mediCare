const patientsmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error');

exports.getpatient = async (req, res,next) => {
    try {
        const doc = patientsmodel.find(req.query).select('-__v -passwordsetat -password -configPassword');
        console.log(req.query);
        if(req.query.page && req.query.limit){

            doc.skip((req.query.page-1)*(req.query.limit*1)).limit(req.query.limit*1);
            
        }
        
        const u = await doc;
        res.status(200).json({
            status: "sucess",
            result_length: u.length,
            data: u
        })
    } catch (err) {
        next( new errorset(401,'cannot find data'));
    }
}

exports.getpatientbyid = async (req, res,next) => {
    try {
        const doc = await patientsmodel.findById(req.params.id).select('-__v -passwordsetat -password -configPassword');
        res.status(200).json({
            status: "sucess",
            data: doc
        })
    } catch (err) {
        next( new errorset(401,'invalid id'));
    }

}

exports.postpatient = async (req, res, next) => {
    try {
        const doc = await patientsmodel.create(req.body);
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
        const doc = await patientsmodel.findByIdAndUpdate(req.body.pid, req.body, {
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