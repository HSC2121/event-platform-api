import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import routes from "./routes/index.routes.js";
import { initializePassport } from "./config/passport.config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

initializePassport();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;