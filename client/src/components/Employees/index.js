import React, { useEffect, useState } from "react";
import { getEmployees } from "../../utils/api";

const Employees = () => {
	const [employees, setEmployees] = useState([]);
	const getAllEmployees = () => {
		getEmployees().then(({ data }) => {
			console.log(data);
			setEmployees(data);
		});
	};
	useEffect(() => {
		getAllEmployees();
	}, []);
	return (
		<main>
			<header className="teal">Employees</header>
			<ul>
				{employees.map((em) => (
					<li>{em.name}</li>
				))}
			</ul>
		</main>
	);
};

export default Employees;
