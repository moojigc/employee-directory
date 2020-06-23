import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import FlashContext from "../../utils/FlashContext";
import { getEmployees } from "../../utils/api";
import Container from "../Container";
import Header from "../Header";
import Main from "../Main";
import UserContext from "../../utils/UserContext";
import { FormSelect } from "materialize-css";
import "./index.css";
import Select from "./Select";
import List from "./List";

const Employees = () => {
	const location = useLocation();
	const user = useContext(UserContext);
	const [departments, setDepartments] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [emFilter, setFilter] = useState([]);
	const getAllEmployees = () => {
		getEmployees(location.pathname === "/demo" ? true : false).then(({ data }) => {
			setEmployees(data);
			setFilter(data);
			setDepartments(
				data
					.map(({ department }) => department)
					.filter((dept, i, thisArray) => thisArray.indexOf(dept) === i)
			);
			// MaterializeCSS dependency
			FormSelect.init(document.querySelectorAll("select"));
		});
	};
	const flash = useContext(FlashContext);
	const handleSearch = ({ target }) => {
		setFilter(
			employees.filter((em) =>
				new RegExp(target.value, "i").test(
					em.firstName + em.lastName + em.department + em.title
				)
			)
		);
	};
	const handleFilter = ({ target }) => {
		if (target.value === "All") setFilter(employees);
		else setFilter(employees.filter((em) => new RegExp(em.department, "i").test(target.value)));
	};
	useEffect(() => {
		getAllEmployees();
	}, []);
	return (
		<Container>
			<Header>
				{user.username || flash.message
					? `Welcome, ${user.username}` || flash.message
					: "Employees"}
			</Header>
			<Main padding="1rem 2rem">
				<div className="col s6 input-field">
					<input
						onChange={handleSearch}
						type="text"
						placeholder="Search by name, title, or department"
					/>
				</div>
				<div className="row" style={{ display: "flex", justifyContent: "center" }}>
					<Select
						options={departments}
						handleFilter={handleFilter}
						label="Department"
						defaultOption="All"
					/>
				</div>
				<List emFilter={emFilter} />
			</Main>
		</Container>
	);
};

export default Employees;
