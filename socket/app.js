const io = require("socket.io")(8001, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];


const removeUser = (socketId) => {
  users = users.filter((user) =>user.socketId !==socketId);
};
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const getUser= (userId)=>{
  return users.find((user)=> user.userId===userId)
 }
io.on("connection", (socket) => {
    //when connected
  console.log("user connected");
  // io.emit("welcome", "hello this is server") envoie à tous les utilisateur
  // take idsocket and userId from user   
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({senderId,receiverId,text})=>{
      const user= getUser(receiverId)
      if(user){
        io.to(user.socketId).emit("getMessage",{
          senderId,
          text,
      })
      }
       
      
      
  })
  socket.on("disconnect", () => {
      //when discoonected
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
