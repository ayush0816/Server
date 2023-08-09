const socketIO = require("socket.io");
let io;
function initialize(server, params) {
  io = new socketIO.Server(server, params);

  // Add event handlers and other socket-related logic here

  return io;
}

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
