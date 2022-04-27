//import modules
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import os from "os";
import { env } from "process";
import "dotenv/config";
//import routes
import adminRoute from "./routes/admin";
import pointRoute from "./routes/geo/point";
import lineRoute from "./routes/geo/line";
import mlineRoute from "./routes/geo/multiline";
import polygonRoute from "./routes/geo/polygon";
import mpolyRoute from "./routes/geo/multipolygon";
import geoRoute from "./routes/geo";

const app = express();

const networkInterfaces = os.networkInterfaces();

let ip: string = "localhost";

for (let networkInterface in networkInterfaces) {
    if (
      networkInterface.toLowerCase().includes('Ethernet') || 
      networkInterface.toLowerCase().includes("wi")
    ) {
        let networks = networkInterfaces[networkInterface];
        networks?.forEach(network => {
            if (network.family === "IPv4") {
                ip = network.address;
            }
        });
    }
};

//Connect to DB
const dbURI: string = env.DB_CONNECTION || "";
const port: number = ~~(env.HTTP_PORT || 3000);
mongoose.connect(
  dbURI,
  {
    autoIndex: true,
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      app.listen(port, ip);
      console.log("Connected to DB");
    }
  }
);

//middleware & static files
app.use(morgan("dev"));
app.use(cors({ exposedHeaders: ["x-access-token", "x-refresh-token"] }));
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

//routes
app.use(`/api/${env.APP_VERSION}/admin`, adminRoute);
app.use(`/api/${env.APP_VERSION}/point`, pointRoute);
app.use(`/api/${env.APP_VERSION}/line`, lineRoute);
app.use(`/api/${env.APP_VERSION}/mline`, mlineRoute);
app.use(`/api/${env.APP_VERSION}/polygon`, polygonRoute);
app.use(`/api/${env.APP_VERSION}/mpolygon`, mpolyRoute);
app.use(`/api/${env.APP_VERSION}/geo`, geoRoute);
