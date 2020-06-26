import axios from "axios";

export async function getEmployees(demo, company) {
	return await axios.get(demo ? "/api/employees-demo" : `/api/employees/${company}`);
}
