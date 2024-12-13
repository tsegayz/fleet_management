import { Router } from "express";
import {
	getVehicles,
	createVehicle,
	updateVehicle,
} from "../controllers/vehicleController";

const router = Router();

router.route("/").get(getVehicles).post(createVehicle).patch(updateVehicle);

export default router;
