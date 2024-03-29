import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "public");
var httpServer = createServer(app);

app.use(express.static(publicPath));

const PORT = process.env.PORT || 5500;
const io = new Server(httpServer, {
  path: "/socket.io",
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("message", (textmsg) => {
    console.log(textmsg);
    socket.broadcast.emit("message", textmsg);
  });
});

// write a get api endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
