import React, { useEffect } from "react";
import Preloader from "../Preloader";
import Axios from "axios";
import { Dropdown } from "materialize-css";
import Employee from "./Employee";

const List = ({
	departments,
	setDepartments,
	setFlash,
	getAllEmployees,
	emFilter,
	setEmFilter,
	company,
	setEmployees,
	employees
}) => {
	useEffect(() => {
		// MaterializeCSS
		Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
			coverTrigger: false
		});
	});
	const handleDelete = async (id) => {
		let { data } = await Axios({
			method: "DELETE",
			url: "/api/employee/" + id
		});
		setEmFilter(emFilter.filter((em) => em._id !== data.employee._id));
		// setEmployees(employees.filter((em) => em._id !== data.employee._id));
		let currDepts = emFilter.filter((em) => em.department === data.employee.department);
		if (!currDepts.length)
			setDepartments(departments.filter((dept) => dept !== data.employee.department));
	};
	return (
		<ul style={{ border: "unset", borderRadius: "0.25rem" }} className="collection">
			{emFilter.length > 0 ? (
				emFilter.map((em, i) => (
					<li className="collection-item" key={em._id}>
						<ul id={"dropdown" + i} className="dropdown-content">
							<li>
								<button
									onClick={() => handleDelete(em._id)}
									className="btn"
									style={{
										textTransform: "unset",
										background: "unset",
										fontSize: "16px",
										color: "#26a69a",
										display: "block",
										lineHeight: "22px",
										padding: "14px 16px",
										width: "100%",
										height: "100%",
										cursor: "pointer"
									}}
									href="#!">
									Delete
								</button>
							</li>
						</ul>
						<button
							data-target={"dropdown" + i}
							style={{ marginRight: "0.5rem" }}
							className="btn dropdown-trigger">
							<i className="material-icons">menu</i>
						</button>
						<Employee
							employees={employees}
							setEmployees={setEmployees}
							setDepartments={setDepartments}
							setEmFilter={setEmFilter}
							emFilter={emFilter}
							setFlash={setFlash}
							getAllEmployees={getAllEmployees}
							name={em.firstName + " " + em.lastName}
							title={em.title}
							department={em.department}
							company={company}
						/>
					</li>
				))
			) : employees.length > 0 ? (
				<Preloader />
			) : null}
			<li className="collection-item">
				<form>
					<h5 style={{ textAlign: "center" }}>Add new employee</h5>
					<Employee
						setEmployees={setEmployees}
						employees={employees}
						setDepartments={setDepartments}
						departments={departments}
						setEmFilter={setEmFilter}
						emFilter={emFilter}
						form={true}
						setFlash={setFlash}
						getAllEmployees={getAllEmployees}
						company={company}
					/>
				</form>
			</li>
		</ul>
	);
};

export default List;
