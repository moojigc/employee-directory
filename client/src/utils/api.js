import Axios from "axios";

export const axios = Axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

export async function getEmployees(demo, company) {
	return await axios.get(
		demo ? "/api/employees-demo" : `/api/employees/${company}`
	);
}
