const docmodel = require('./../models/doctorsmodel');
const errorset = require('./../utils/error');
const factoryhandler = require('./handlerFactory');

exports.getdoctors = factoryhandler.getclients(docmodel);

exports.getdoctorsbyid = factoryhandler.getclientbyId(docmodel);

exports.postdoctors = factoryhandler.postclient(docmodel);

exports.update = factoryhandler.update(docmodel);

