
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//Port from environment variable or default - 4001
const port = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
}});

io.on('connection', (socket) => 
{
  console.log("connection success");
  const id = socket.handshake.id;
  console.log(id)
  socket.join(id);
  // socket.broadcast.to("ui").emit("telemetry-data", {
  //   data,
  //   health:"socket is good"
  // })
  socket.on("command-ingest", (data)=>{
    console.log(data)
    socket.broadcast.emit("commands", data);
  })
  socket.on("incoming data", (data)=>{
    socket.broadcast.emit("telemetry-data", {
      data,
      health:"socket is good"
    })
  })
  socket.on('telemetry-out', ({data, health}) => {
    socket.broadcast.to("ui").emit("telemetry-data", {
      data,
      health:"socket is good"
    })
  });
  socket.on("command-out", ({commands})=>{
    socket.broadcast.to("pod-out").emit("commands", {
      command:"",
      health:""
    });
  })
  socket.on("disconnect", ()=>{
    socket.broadcast.emit("disconnected", {
      health:"not so good"
    })
  })
}
);

server.listen(port, () => console.log(`Listening on port ${port}`));