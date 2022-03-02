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

const server = require('../server');

///////////////

const io = require("socket.io")(server, {
    cors: {
        origin: "https://medicare-ayusss.herokuapp.com",
    },
});

let users = [];
const addUser = (userid,socketid) => {
    !users.some((user) => user.userid === userid) &&
    users.push({ userid, socketid });
    //console.log(users);
}
io.on('connection', (socket) => {


    socket.on("adduser",(userid)=>{
        addUser(userid,socket.id);
        console.log("connected");
    })

    socket.on("send message",(data)=>{
        console.log("send");
        io.emit(data.to,data);
    })

    socket.on("disconnect", () => {
        users.filter((users) => {
            users.socketid !== socket.id
        })
       // console.log(users);
    })

})
/////////////////////////////////



const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`server listening at ${port}`);
})

module.exports = server;