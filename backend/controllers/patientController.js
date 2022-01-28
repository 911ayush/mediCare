const patientsmodel = require('./../models/patientsmodel');
const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');

exports.getpatient = factoryhandler.getclients(patientsmodel);

exports.getpatientbyid = factoryhandler.getclientbyId(patientsmodel);

exports.postpatient = factoryhandler.postclient(patientsmodel);

exports.update = factoryhandler.update(patientsmodel);
