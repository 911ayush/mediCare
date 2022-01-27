const dotenv = require('dotenv');
const fs = require('fs');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}./../config.env` });
// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser:true,
//     useFindAndModify:false,
//     useCreateIndex: true
//   }).then(con =>{
//     //console.log(con.connections);
//     console.log("done connecting database");
//   }).catch(err=>{
//     console.log(err);
//   })
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(con => {
   // console.log(con.connections);
   console.log("DB connection stablish")
}).catch(err => {
    console.log(err.message);
});
app.listen(8000, () => {
    console.log("server listening at 8000");
})