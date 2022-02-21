const errorset = require('./../utils/error');
const firebaseTokenModel = require('./../models/firebasetoken');


exports.storeToken = async (req, res, next) => {
    try {
        let doc;
        const firebasetoken = req.body.token;
        console.log(req.body);
        if (req.body.did!=null) {
            doc = await firebaseTokenModel.findOne({ firebasetoken });
            if (doc) {
                if((doc.patient != null) || (doc.doctor != req.body.did)){
                    doc.patient = null;
                    doc.doctor = req.body.did;
                    doc.save();
                }               
            }
            else{
                doc = await firebaseTokenModel.create({
                    "firebasetoken": req.body.token,
                    "doctor": req.body.did,
                    "patient": null
                })
            }
            console.log("did: ", req.body.did)
        } else if (req.body.pid) {
            doc = await firebaseTokenModel.findOne({ firebasetoken });
            if(doc){
                if ((doc.patient != req.body.pid) || (doc.doctor != null)) {
                    doc.patient = req.body.pid;
                    doc.doctor = null;
                    doc.save();
                }
            }else{
                doc = await firebaseTokenModel.create({
                    "firebasetoken": req.body.token,
                    "doctor": null,
                    "patient": req.body.pid
                })
            }
           
            console.log("pid: ", req.body.pid)
        } else {
            console.log("no auth");
        }
        console.log(req.body);
        res.status(200).json({
            status: "success",
            data: doc
        })

    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }

}

exports.removetoken = async (req,res,next) => {
    try {
        const firebasetoken = req.body.token;
        await firebaseTokenModel.findOneAndDelete({firebasetoken});
        res.status(200).json({
            status: "success",
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            err: err.message
        })
    }
}