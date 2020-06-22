import axios from "axios";

export async function getEmployees() {
	return await axios.get("/api/employees");
}
