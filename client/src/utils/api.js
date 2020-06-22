import axios from "axios";

export async function getEmployees() {
	return await axios.get("/api/employees");
}

export async function checkLogin() {
	return await axios.get("/api/login", {
		withCredentials: true
	});
}
