const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const socket = require("socket.io");
dotenv.config();

const PORT = process.env.PORT || 8000;

// log request
app.use(morgan("tiny"));

// use cors
app.use(cors());

// static file
app.use("/images", express.static("./images"));

// parse request
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Chat app");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // create server
    const server = app.listen(PORT, () => {
      console.log(`Connected to database && server running on port ${PORT}`);
    });

    // created io
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    let onlineUsers = [];

    const addUser = (userId, socketId) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId });
      }
    };
    io.on("connection", (socket) => {
      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        if (onlineUsers) {
          socket.emit("onlineUsers", onlineUsers);
        }
      });

      socket.on("sendMessage", (data) => {
        const recieverUser = onlineUsers.find(
          (user) => user.userId === data.to
        );

        if (recieverUser) {
          socket.to(recieverUser.socketId).emit("getMessage", data);
        }
        socket.emit("onlineUsers", onlineUsers);
      });
      socket.on("logout", (userId) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
        socket.emit("onlineUsers", onlineUsers);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
