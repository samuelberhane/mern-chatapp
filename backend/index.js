const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
dotenv.config();

const PORT = process.env.PORT || 8000;

// log request
app.use(morgan("tiny"));

// use cors
app.use(cors());

// parse request
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Chat app");
});

// routes
app.use("/api/auth", authRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to database && server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
