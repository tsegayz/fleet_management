import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(json());
const corsOptions = {
	origin: "http://localhost:3000", 
};

app.use(cors(corsOptions));


export default app;
