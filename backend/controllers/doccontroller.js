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

// exports.nearby = async (req,res,next) => {
//     try{
//         const { distance, latlng, unit} = req.params;
//         const [lat, lng] = latlng.split(',');

//         const radius = unit === 'mi' ? distance/3963.2 : distance/6378.1;
//         if(!lat || !lng){
//             next(new errorset('400','please provide lattitude and longitude'))
//         }
        
//         // const doc = await docmodel.aggregate([
//         //     {
//         //         $geoNear: {
//         //             near: {
//         //               type: 'Point',
//         //               coordinates: [lng * 1, lat * 1]
//         //             },
//         //             distanceField: 'distance',
//         //           }  
//         //     },{ $geoWithin: { path: 'hospitalAddress', $centerSphere: [[lat, lng], radius] } }
//         // ]);
//         const doc = docmodel.find({ hospitalAddress: { $geoWithin: { $centerSphere: [[lat, lng], radius] } } });
//       //  const doc = docmodel.find().within({lat,lng});
//         res.status(200).json({
//             "status":'sucess',
//             results:doc.length,
//             doc
//         })
//     }
//     catch(err){
//         next(new errorset(400,err.message));
//     }
// }
// // const distances = await Tour.aggregate([
// //     {
// //       $geoNear: {
// //         near: {
// //           type: 'Point',
// //           coordinates: [lng * 1, lat * 1]
// //         },
// //         distanceField: 'distance',
// //         distanceMultiplier: multiplier
// //       }
// //     },
// //     {
// //       $project: {
// //         distance: 1,
// //         name: 1
// //       }
// //     }
//   ]);