import Vehicle from "./../models/vehicleModel.js";

export async function getVehicles(req, res) {
    try {
      const vehicles = await Vehicle.find(); 
      res.status(200).json({
        status: "success",
        data: vehicles,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error fetching data",
      });
    }
  }
  

//// create new Vehicle
export async function createVehicle(req, res) {
	try {
		const newVehicle = await Vehicle.create(req.body);

		res.status(201).json({
			status: "sucess",
			data: {
				vehicle: newVehicle,
			},
		});
	} catch (err) {
		res.status(404).json({
			data: {
				status: "fail",
				message: err,
			},
		});
	}
}
export async function updateVehicle(req, res) {
  try {
      if (!req.body.status) {
          return res.status(400).json({
              status: "fail",
              message: "Status field is required",
          });
      }

      const updatedVehicle = await Vehicle.findOneAndUpdate(
          { _id: req.params.id }, 
          { 
              status: req.body.status, 
              lastUpdated: new Date() 
          },
          { new: true, runValidators: true } 
      );

      if (!updatedVehicle) {
          return res.status(404).json({
              status: "fail",
              message: "Vehicle not found",
          });
      }

      res.status(200).json({
          status: "success",
          data: updatedVehicle,
      });
  } catch (err) {
      res.status(400).json({
          status: "fail",
          message: "Invalid data or error during update",
      });
  }
}
