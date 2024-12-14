import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://pizza-delivery-backend-deploy.vercel.app";

function App() {
	const [vehicle, setVehicle] = useState([]);
	const [status, setStatus] = useState({});

	const fetchData = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/v1/vehicles`);
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

	const handleStatusChange = async (id, newStatus) => {
		try {
			const response = await axios.patch(
				`${API_URL}/api/v1/vehicles/${id}`,
				{
					status: newStatus,
				}
			);
			if (response.status === 200) {
				setStatus((prevStatus) => ({ ...prevStatus, [id]: newStatus }));
			}
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};

	return (
		<div className='vehicle-container'>
			<div className='vehicle-row header-row'>
				<div className='vehicle-column'>Vehicle Name</div>
				<div className='vehicle-column'>Status</div>
				<div className='vehicle-column'>Last Updated</div>
			</div>
			{vehicle.map((value) => (
				<div key={value._id} className='vehicle-row'>
					<div className='vehicle-column'>{value.name}</div>
					<div className='vehicle-column'>
						<select
							value={status[value._id]}
							onChange={(e) => handleStatusChange(value._id, e.target.value)}
							className={
								status[value._id] === "Inactive"
									? "inactive-status"
									: "active-status"
							}
						>
							<option value='Active'>Active</option>
							<option value='Inactive'>Inactive</option>
						</select>
					</div>
					<div className='vehicle-column'>
						<span>
							{new Date(value.lastUpdated).toLocaleDateString("en-GB")}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
