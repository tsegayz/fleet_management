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
	origin: (origin, callback) => {
	  const allowedOrigins = [
		"http://localhost:5173",
		"https://fleet-management-iota.vercel.app"
	  ];
  
	  if (!origin || allowedOrigins.includes(origin)) {
		callback(null, true);
	  } else {
		callback(new Error("Not allowed by CORS"));
	  }
	}
  };
app.use(cors(corsOptions));


app.use("/api/v1/vehicles", vehicleRouter);

export default app;
