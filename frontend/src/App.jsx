import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [vehicle, setVehicle] = useState([]);
  const [status, setStatus] = useState({}); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/vehicles");
      const vehicleData = response.data.data;

      // Initialize the status state based on the fetched data
      const initialStatus = vehicleData.reduce((acc, curr) => {
        acc[curr._id] = curr.status; 
        return acc;
      }, {});
      setStatus(initialStatus);
      setVehicle(vehicleData); 
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleStatusChange = (id, newStatus) => {
    setStatus((prevStatus) => ({ ...prevStatus, [id]: newStatus }));
  };

  return (
		<div className="vehicle-container">
		  <div className="vehicle-row header-row">
			<div className="vehicle-column">Vehicle Name</div>
			<div className="vehicle-column">Status</div>
			<div className="vehicle-column">Last Updated</div>
		  </div>
		  {vehicle.map((value) => (
			<div key={value._id} className="vehicle-row">
			  <div className="vehicle-column">{value.name}</div>
			  <div className="vehicle-column">
				<select
				  value={status[value._id] || "Active"} // Show the correct status value for each vehicle
				  onChange={(e) => handleStatusChange(value._id, e.target.value)} // Update the status when changed
				  className={status[value._id] === "Inactive" ? "inactive-status" : "active-status"} // Assign class based on status
				>
				  <option value="Active">Active</option>
				  <option value="Inactive">Inactive</option>
				</select>
			  </div>
			  <div className="vehicle-column">
				<span>{new Date(value.lastUpdated).toLocaleDateString("en-GB")}</span>
			  </div>
			</div>
		  ))}
		</div>
  );
}

export default App;
