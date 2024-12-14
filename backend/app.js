import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import vehicleRouter from "./routes/vehicleRouter.js";

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(json());
const corsOptions = {
	origin: "http://localhost:5173", 
};

app.use(cors(corsOptions));


app.use("/api/v1/vehicles", vehicleRouter);

export default app;
