import categoryRoute from "../routes/categoryRouter";
// import authRouter from "../routes/authRouter";
// import onboardingRoute from "../routes/onboardingRouter";
// import webhookRouter from "../routes/webhooksRouter";
// import billRouter from "../routes/billsRouter";
// import passwordRouter from "../routes/passwordRouter";
require("dotenv").config();
import cors from "cors";
import express from "express";
// import { BaseController } from "../config/helpers";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import session from "express-session";
import { SECRET } from "../config";

import logger from "./logger";
import morgan from "morgan";
class StartApp {
  public express = express();

  constructor() {
    this.server();
  }
  server() {
    console.log("Starting");
    this.express.set("trust proxy", true);

    // console.log({ publicRoute: publicRoute.PrintableRouter });

    // cross origin middleware
    this.express.use(
      cors({
        origin: "http://localhost:2027", // Adjust this to your client's origin
        credentials: true,
      })
    );

    // set security HTTP headers
    this.express.use(helmet());

    // const apiLimiter = packages.rateLimit({
    //   windowMs: 1000, // 15 minutes
    //   max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    //   message: "Api call error, too many requests",
    //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // });

    // app.use(apiLimiter);

    // session
    this.express.use(cookieParser());
    this.express.use(compression());
    this.express.use(express.json());
    this.express.use(
      session({
        secret: SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 600000 },
      })
    );

    const morganFormat = ":method :url :status :response-time ms";

    this.express.use(
      morgan(morganFormat, {
        stream: {
          write: (message: any) => {
            const logObject = {
              method: message.split(" ")[0],
              url: message.split(" ")[1],
              status: message.split(" ")[2],
              responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
          },
        },
      })
    );
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    this.express.use("/api/v1/", categoryRoute);

    this.express.use((req: any, res: any, next: any) => {
      res.header("Acces-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, apiKey"
      );

      if (req.method == "OPTIONS") {
        req.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, DELETE, PATCH, GET"
        );
        return res.status(200).json({});
      }

      next();
    });

    this.express.use((error: any, req: any, res: any, next: any) => {
      if (error.message == "Unathorized from server") {
        return res.status(401).json("Email does not exist");
      }

      res.status(error.status || 500);
      res.json({
        error: {
          status: "ERROR",
          message: error.message,
        },
      });
    });

    // Error handling middleware
    this.express.use((err: any, req: any, res: any, next: any) => {
      let errCode, errMessage;

      if (err.errors) {
        errCode = 400;
        const keys = Object.keys(err.errors);
        errMessage = err.errors[keys[0]].message;
      } else {
        errCode = err.status || 500;
        errMessage = err.message || "Internal Server Error";
      }

      res.status(errCode).type("txt").send(errMessage);
    });

    // Landing page
    this.express.use("/", (req: any, res: any, next: any) => {
      // Example usages
      res.status(200).send({ message: "Server running" });
    });
  }
}

export default new StartApp().express;
