const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error');
const catchAsync = require('./../utils/catchAsync');


exports.getdoctors = catchAsync( async (req, res,next) => {
    
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
   
});

exports.getdoctorsbyid = catchAsync (async (req, res,next) => {
   
        const doc = await docmodel.findById(req.params.id).select('-__v -passwordsetat -password -configPassword');

         if(!doc){
            return next(new errorset(404,'invalid doc id '));
        }

        res.status(200).json({
            status: "sucess",
            data: doc
        })
   
});

exports.postdoctors =catchAsync( async (req, res, next) => {
    
        const doc = await docmodel.create(req.body);
        res.status(200).json({
            status: "sucess",
            doc
        })
    
});

exports.update = catchAsync( async (req, res,next) => {
   
        const doc = await docmodel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!doc){
            return next(new errorset(404,'invalid doc id '));
        }
        
        res.status(200).json({
            status: "sucess",
            doc
        });
   
});