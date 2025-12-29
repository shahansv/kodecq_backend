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

    socket.on("joinWorkspace", (workspaceID) => {
      socket.join(workspaceID);
      console.log(`Socket ${socket.id} joined workspace ${workspaceID}`);
    });

    socket.on("codeChange", ({ workspaceID, code }) => {
      socket.to(workspaceID).emit("code-update", code);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
