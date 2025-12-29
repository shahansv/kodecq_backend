const { Server } = require("socket.io");
const baseURL = require("./baseURL");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: baseURL,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);


    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
