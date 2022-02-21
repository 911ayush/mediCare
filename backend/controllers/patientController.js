const patientsmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');

exports.getpatient = factoryhandler.getclients(patientsmodel);

exports.getpatientbyid = factoryhandler.getclientbyId(patientsmodel);

exports.postpatient = factoryhandler.postclient(patientsmodel);

exports.update = factoryhandler.update(patientsmodel);
const https = require('https')
const http = require('http')

const generateString = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.uploadProfilePic = async (req,res,next) => {
    try{
        console.log(req.body);
        const patient = await patientsmodel.findById(req.body.pid);
        //console.log(patient);
        patient.profilePic = req.file.buffer;
        await patient.save();
        res.status(200).json({
            status:"success",
            patient
        })
    }catch(err){
        res.status(500).json({
            status:"failed",
            error:err
        })
    }
}

exports.loginWithFacebok = async (req,res,next) => {
    try{
        console.log(req.body);
        let token;
        let doc;
        const hreq = https.get(`https://graph.facebook.com/me?access_token=${req.body.accessToken}&fields=email`,hres => {
            hres.on('data', async d=> {
                const data = JSON.parse(d.toString());
                const email = data.email;
                doc = await patientsmodel.findOne({email});

                if(doc){
                    token  = factoryhandler.getToken(doc.id);
                }else{
                    const password = generateString(20);
                    req.body.password = password;
                    req.body.configPassword = password;
                    try {
                        doc = await patientsmodel.create(req.body);
                        token = factoryhandler.getToken(doc._id);
                        
                    } catch (err) {
                        res.status(401).json({
                            status: "failed",
                            err: err.message
                        })
                    }
                }
                console.log(doc);
                res.status(200).json({
                    status:"success",
                    token,
                    doc
                })
            })
        });
        hreq.on('error',e => {
            next(new errorset(400,e.toString()));
            console.log(e);
        })
        hreq.end();        
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"failed",
            error:err
        })
    }
}