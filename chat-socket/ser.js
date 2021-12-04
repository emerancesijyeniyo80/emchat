const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const SERVER_PORT = 4000;
const SERVER_URL = "ws://localhost:3000";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Define EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

console.log("Helo");
// Creating socket
io.on("connection", (socket) => {
  console.log("connecting..");
});

// Defining event emmiter by setting connection

io.on("connection", (socket) => {
  // socket variable difene every thing we are going to be using in our socket
  // We can set different events, pipelines and send data
  // Every socket connection has it's own id
  console.log("User connected:" + socket.id);

  //   on property used to reaceive event while emit property used to send

  socket.on("message", (data) => {
    // console.log(data);
    // we can emit data to everyone but not your self
    // 1. Emit data to every one on server
    socket.broadcast.emit("message", data);
  });
});

// Start server
server.listen(SERVER_PORT, () => {
  console.log(`Socket Server is running on port ${SERVER_PORT}`);
});
