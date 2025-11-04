import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite frontend URL
    methods: ["GET", "POST"],
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  console.log("✅ User connected:", socket.id, "Online:", onlineUsers);
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    console.log("❌ User disconnected:", socket.id, "Online:", onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server on ${PORT}`));

