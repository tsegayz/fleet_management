import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
	{
		_id: { type: Number, required: true },
		name: {
			type: String,
			required: [true, "a vehicle must have a name"],
		},
		status: {
			type: String,
			default: "Active",
		},
		lastUpdated: Date
	},
);

// THE MODEL
const Vehicle = model("Vehicle", vehicleSchema);


export default Vehicle;
