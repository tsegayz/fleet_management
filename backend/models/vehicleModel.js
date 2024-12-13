import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
	_id: { type: Number, required: true },
	name: {
		type: String,
		required: [true, "a vehicle must have a name"],
	},
	status: {
		type: String,
		default: "Active",
	},
});

// THE MODEL
const Course = model("Course", vehicleSchema);

export default Course;
