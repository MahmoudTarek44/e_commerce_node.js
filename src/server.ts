// Module Imports
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Helper Imports
import globalError from "./Middlewares/global_error.middleware";
import DBConnection from "../Database/database.connection";
import { AppError } from "./Utilities/error_handler";
import appRouter from "./Router/app.router";

dotenv.config(); 
DBConnection();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.static("Uploads")); 
app.use(morgan("combined"));

app.use("/api/v1", appRouter);
app.all("*", (request: Request, response: Response, next: NextFunction) =>
	next(new AppError(`This route is not found: ${request.originalUrl}`, 404)));
app.use(globalError);

// Init server && server errors
const port = process.env.APP_PORT;
app.listen(port, () => {
	console.log(`Server is running on port ${port} ....`);
});

process.on("unhandledRejection", (error) =>
	console.log("unhandledRejection", error)
);
