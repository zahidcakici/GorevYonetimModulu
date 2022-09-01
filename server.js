const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");
// socket setup
const app = express();
const server = http.createServer(app);
const io = socket(server);
const { createJob, updateJob } = require("./handlers/job.handler")(io);

// connect to the database
mongoose.connect("mongodb://localhost:27017/Jobs",{ useNewUrlParser: true,}, (err) => {
    if (err)
      console.log(err);
    else 
      console.log("Connected to the database");
  }
);

io.on("connection", (socket) => {

  socket.on("JobUpdateRobot", updateJob);
  socket.on("JobCreate", createJob);

  setInterval(() => {
    socket.emit("BatteryInfo", { batteryLevel: "98" });
  }, 1000);
});

//app.use(express.static());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
