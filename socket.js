const { Server } = require("socket.io");
const baseURL = require("./baseURL");

const workspaceUsers = {};

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: baseURL },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinWorkspace", ({ workspaceID, user }) => {
      socket.join(workspaceID);

      if (!workspaceUsers[workspaceID]) {
        workspaceUsers[workspaceID] = [];
      }

      const alreadyExists = workspaceUsers[workspaceID].find(
        (eachUser) => eachUser.userId === user.userId
      );

      if (!alreadyExists) {
        workspaceUsers[workspaceID].push({
          socketId: socket.id,
          ...user,
        });

        socket.to(workspaceID).emit("userJoined", user);
      }

      io.to(workspaceID).emit("workspaceUsers", workspaceUsers[workspaceID]);
    });

    socket.on("languageChange", ({ workspaceID, language }) => {
      socket.to(workspaceID).emit("languageUpdate", language);
    });

    socket.on("runResult", ({ workspaceID, output, isError }) => {
      socket.to(workspaceID).emit("runResultUpdate", {
        output,
        isError,
      });
    });

    socket.on("codeChange", ({ workspaceID, code }) => {
      socket.to(workspaceID).emit("codeUpdate", code);
    });

    socket.on("disconnect", () => {
      for (let workspaceID in workspaceUsers) {
        const users = workspaceUsers[workspaceID];

        const index = users.findIndex(
          (eachUser) => eachUser.socketId === socket.id
        );

        if (index !== -1) {
          const user = users[index];
          users.splice(index, 1);

          socket.to(workspaceID).emit("userLeft", user);
          io.to(workspaceID).emit("workspaceUsers", users);
        }
      }
    });
  });
};
