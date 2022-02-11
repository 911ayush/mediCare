const jwt = require('jsonwebtoken');
const promisify = require('promisify');
const errorset = require('./../utils/error.js');
const factoryhandler = require('./handlerFactory');
const docmodel = require('./../models/doctorsmodel');
const patientmodel = require('./../models/patientsmodel');



//SETTING ID'S AND CHECKING FOR VALID AUTH TOKEN

exports.dauth = factoryhandler.auth(docmodel,1);

exports.pauth = factoryhandler.auth(patientmodel,0);

exports.gauth = factoryhandler.auth('g',2);

//AUTH OF PATIENTS

exports.signuppatient = factoryhandler.signupclient(patientmodel);

exports.loginpatient = factoryhandler.loginclient(patientmodel);



//AUTH OF DOCTORS

exports.signupdoc = factoryhandler.signupclient(docmodel);

exports.logindoc = factoryhandler.loginclient(docmodel);
