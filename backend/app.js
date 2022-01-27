const express = require('express');
const doctorRouter = require('./routes/doctorRouter.js');

const app = express();
app.use(express.json());


app.use('/api/v1/',doctorRouter);



module.exports = app;