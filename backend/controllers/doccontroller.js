const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error');

exports.getdoctors = async (req, res,next) => {
    try {
        const doc = await docmodel.find({});
        res.status(200).json({
            status: "sucess",
            data: doc
        })
    } catch (err) {
        next( new errorset(401,'cannot find data'));
    }
}

exports.getdoctorsbyid = async (req, res,next) => {
    try {
        const doc = await docmodel.findById(req.params.id);
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