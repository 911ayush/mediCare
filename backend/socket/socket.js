
// const io = require("socket.io")(8900, {
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });
const server = require('../server');
const io = require("socket.io")(server, {
    cors: {
        origin: "http://pacific-bayou-88396.herokuapp.com",
    },
});
console.log(io);

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
