const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');
const docmodel = require('./../models/doctorsmodel');

exports.getdoctors = factoryhandler.getclients(docmodel);

exports.getdoctorsbyid = factoryhandler.getclientbyId(docmodel);

exports.postdoctors = factoryhandler.postclient(docmodel);

exports.update = factoryhandler.update(docmodel);

exports.nearby = async (req,res,next) => {
    try{
        const { distance, latlng, unit} = req.params;
        const  d = Number(distance);
        const [lat, lng] = latlng.split(',');

        const radius = unit === 'mi' ? distance/3963.2 : distance/6378.1;
        if(!lat || !lng){
            next(new errorset('400','please provide lattitude and longitude'))
        }

        const doc = await docmodel.find({ hospitalAddress: { $geoWithin: { $centerSphere: [[lat, lng], radius] } } });
        res.status(200).json({
            "status":'sucess',
            results:doc.length,
            doc
        })
    }
    catch(err){
        next(new errorset(400,err.message));
    }
}