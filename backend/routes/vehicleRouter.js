import { Router } from "express";
import {
	getVehicles,
	createVehicle,
	updateVehicle,
} from "../controllers/vehicleController.js";

const router = Router();

router
	.route("/")
	.get(getVehicles)
	.post(createVehicle)
	.patch(updateVehicle);
router
	.route("/:id")
	.patch(updateVehicle);

export default router;
