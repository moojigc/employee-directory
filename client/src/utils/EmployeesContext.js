import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const EmployeesContext = createContext([
	{
		_id: {},
		firstName: "",
		lastName: "",
		company: "",
		department: "",
		title: ""
	}
]);
const { Provider } = EmployeesContext;

/**
 * Get and set employees state
 * @param {{}[]} employees
 * @param {{ type: "get" | "delete" | "post", employee: {} }} action
 */
const reducer = (employees, action) => {
	switch (action.type) {
		case "get":
			axios.get("/api/employees").then(({ data }) => {
				return data;
			});
			break;
		case "delete":
			axios({ url: "/api/employee/" + action.id, method: "DELETE" }).then(({ data }) => {
				return employees.filter((em) => em._id !== data.employee._id);
			});
			break;
		case "post":
			axios({ url: "/api/employees", method: "POST", data: action.employee }).then(
				({ data }) => {
					employees = employees.slice(0).push(data);
					return employees;
				}
			);
			break;
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

const EmployeesProvider = ({ value = [], ...props }) => {
	const [employees, dispatch] = useReducer(reducer, []);

	return <Provider value={[employees, dispatch]} {...props} />;
};

const useEmployeesContext = () => {
	return useContext(EmployeesContext);
};

export { EmployeesProvider, useEmployeesContext };
