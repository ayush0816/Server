const socketIO = require("socket.io");
let io;
function initialize(server, params) {
  io = new socketIO.Server(server, params);

  return io;
}

// Getting the io instance
function getIO() {
  if (!io) {
    throw new Error("Socket.IO instance has not been initialized.");
  }
  return io;
}

module.exports = {
  initialize,
  getIO,
};
