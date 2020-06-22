import React, { useEffect, useState } from "react";
import { getEmployees } from "../../utils/api";
import Container from "../Container";
import "./index.css";

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
		<Container>
			<header className="teal">Employees</header>
			<ul>
				{employees.map((em) => (
					<li>{em.firstName + em.lastName}</li>
				))}
			</ul>
		</Container>
	);
};

export default Employees;
