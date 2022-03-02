const dotenv = require('dotenv');
const fs = require('fs');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}./../config.env` });

console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(con => {
   // console.log(con.connections);
   console.log("DB connection stablish")
}).catch(err => {
    console.log(`error: ${err.message}`);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`server listening at ${port}`);
})

module.exports = server;