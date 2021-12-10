const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./Routes/userRouter");
const { URI } = require("./connectionString");

class Server {
  PORT = process.env.PORT || 3000;

  constructor() {
    this.connectDB(URI);
    this.configServer();
    this.rootRoutes();
  }

  connectDB = async (URI) => {
    console.log("Connecting to the database...");
    await mongoose.connect(URI);
  };

  configServer = () => {
    this.App = express();

    // Address the Server
    this.App.use(express.static("build"));
    this.App.use(express.urlencoded({ extended: true }));
    this.App.use(express.json());

    // Mount the routers
    this.App.use("/api", userRouter);
  };

  rootRoutes = () => {
    this.App.get("/", (req, res) => {
      res.send("Welcome to FSWD Final Exam API!");
    });
  };

  Start = () => {
    this.App.listen(this.PORT, () => {
      console.log(`Running on port ${this.PORT}`);
    });
  };
}

const FinalAPI = new Server();
FinalAPI.Start();
