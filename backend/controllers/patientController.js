const patientsmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error');
const catchAsync = require('./../utils/catchAsync');
exports.getpatient = catchAsync (async (req, res,next) => {
    
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
   
});

exports.getpatientbyid = catchAsync( async (req, res,next) => {
    
        const doc = await patientsmodel.findById(req.params.id).select('-__v -passwordsetat -password -configPassword');
        res.status(200).json({
            status: "sucess",
            data: doc
        })
    

});

exports.postpatient = catchAsync (async (req, res, next) => {
    
        const doc = await patientsmodel.create(req.body);
        res.status(200).json({
            status: "sucess",
            doc
        })
    
});

exports.update = catchAsync( async (req, res,next) => {
   
        const doc = await patientsmodel.findByIdAndUpdate(req.body.pid, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "sucess",
            doc
        });
    
});