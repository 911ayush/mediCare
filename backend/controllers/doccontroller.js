const docmodel = require('./../models/doctorsmodel');


exports.getdoctors = async (req, res) => {
    console.log(req.headers.Authorizatio);
    const doc = await docmodel.find({});
    res.status(200).json({
        status: "sucess",
        data: doc
    })
}

exports.postdoctors = async (req, res) => {
    try {
        const doc = await docmodel.create(req.body);
        res.status(200).json({
            status: "sucess",
            doc
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        const doc = await docmodel.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
        });
        res.status(200).json({
            status:"sucess",
            doc
        });
    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }
}