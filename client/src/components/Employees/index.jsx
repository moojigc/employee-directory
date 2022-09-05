import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlashContext } from "../../utils/FlashContext";
import { getEmployees } from "../../utils/api";
import Container from "../Container";
import Header from "../Header";
import Main from "../Main";
import { useUserContext } from "../../utils/UserContext";
import Select from "./Select";
import List from "./List";
import { EmployeesProvider } from "../../utils/EmployeesContext";

const Employees = ({ setFlash }) => {
	const location = useLocation();
	const [user] = useUserContext();
	const [currentDept, setCurrentDept] = useState(RegExp);
	const [company, setCompany] = useState("");
	const [departments, setDepartments] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [emFilter, setFilter] = useState([]);
	const getAllEmployees = () => {
		getEmployees(location.pathname === "/demo" ? true : false, user.company).then(
			({ data }) => {
				setEmployees(data);
				setFilter(data);
				setDepartments(
					data
						.map(({ department }) => department)
						.filter((dept, i, thisArray) => thisArray.indexOf(dept) === i)
				);
				setCompany(user.company ? user.company : data.length > 0 ? data[0].company : null); // this double-ternary is atrocious. but it still works somehow.
			}
		);
	};
	const [_flash, dispatchFlash] = useFlashContext();
	const handleSearch = ({ target }) => {
		setFilter(
			employees.filter(
				(em) =>
					new RegExp(target.value, "i").test(em.firstName + em.lastName + em.title) &&
					currentDept.test(em.department)
			)
		);
	};
	const handleFilter = ({ target }) => {
		if (target.value === "All") {
			setFilter(employees);
		} else {
			setCurrentDept(new RegExp(target.value), "i");
			setFilter(employees.filter((em) => new RegExp(target.value, "").test(em.department)));
		}
	};
	const H2 = () => {
		return (
			<h2
				style={{
					textAlign: "center",
					margin: 0,
					fontSize: "2.5rem"
				}}>
				<b>{company}</b> Staff
			</h2>
		);
	};
	useEffect(() => {
		getAllEmployees();
		return () => setEmployees([]);
	}, [user]);
	return (
		<Container>
			<EmployeesProvider>
				<Header>Welcome, {user.auth ? user.username : "Guest"}</Header>
				<Main padding="1rem 2rem">
					<H2 />
					<hr />
					<div className="row" style={{ display: "flex", justifyContent: "center" }}>
						<Select
							options={departments}
							handleFilter={handleFilter}
							label="Department"
							defaultOption="All"
						/>
					</div>
					<div className="col s6 input-field">
						<input
							onChange={handleSearch}
							type="text"
							placeholder="Search by name, title"
						/>
					</div>
					<List
						departments={departments}
						setDepartments={setDepartments}
						employees={employees}
						setEmployees={setEmployees}
						setFlash={setFlash}
						getAllEmployees={getAllEmployees}
						setEmFilter={setFilter}
						emFilter={emFilter}
						company={company}
					/>
				</Main>
			</EmployeesProvider>
		</Container>
	);
};

export default Employees;
