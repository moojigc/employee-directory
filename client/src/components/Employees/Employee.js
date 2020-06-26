import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useFlashContext } from "../../utils/FlashContext";

const Employee = ({
	departments,
	setDepartments,
	setEmFilter,
	emFilter,
	form,
	name,
	title,
	department,
	company,
	employees,
	setEmployees
}) => {
	const history = useHistory();
	const [newFirstName, setFirstName] = useState("");
	const [newLastName, setLastName] = useState("");
	const [newTitle, setTitle] = useState("");
	const [newDept, setDept] = useState("");
	const [_, dispatchFlash] = useFlashContext({});
	const addEmployee = async (event) => {
		event.preventDefault();
		let { data } = await Axios({
			method: "POST",
			data: {
				firstName: newFirstName,
				lastName: newLastName,
				title: newTitle,
				department: newDept,
				company: company
			},
			withCredentials: true,
			url: "/api/employees"
		});
		dispatchFlash({ flash: data.flash });
		if (data.flash.type === "error") {
			history.push(data.redirect);
		} else {
			setEmFilter(emFilter.concat([data.employee]));
			setEmployees(employees.concat([data.employee]));
			setDepartments(
				departments
					.concat([data.employee.department])
					.filter((dept, i, thisArray) => thisArray.indexOf(dept) === i)
			);
		}
	};
	return (
		<div style={{ width: "100%" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline"
				}}>
				<div
					style={{
						marginBottom: "0",
						fontWeight: "bolder",
						fontSize: "1.5rem"
					}}>
					{form ? (
						<div
							style={{
								width: "auto",
								display: "flex",
								justifyContent: "space-between"
							}}>
							<input
								required
								className="validate"
								name="firstName"
								style={{ width: "90%", marginRight: "0.25rem" }}
								onChange={({ target }) => setFirstName(target.value)}
								type="text"
								placeholder="First name"
							/>
							<input
								required
								className="validate"
								name="lastName"
								style={{ width: "90%" }}
								onChange={({ target }) => setLastName(target.value)}
								type="text"
								placeholder="Last name"
							/>
						</div>
					) : (
						<p>{name}</p>
					)}
				</div>
				<span style={{ marginBottom: "0", textAlign: "right" }}>
					{form ? (
						<input
							required
							className="validate"
							name="title"
							onChange={({ target }) => setTitle(target.value)}
							type="text"
							placeholder="Title"
						/>
					) : (
						title
					)}
				</span>
			</div>
			<hr style={{ width: "100%", borderColor: "var(--accent)" }} />
			<p style={{ marginTop: "0" }}>
				{form ? (
					<input
						required
						className="validate"
						name="department"
						onChange={({ target }) => setDept(target.value)}
						type="text"
						placeholder="Department"
					/>
				) : (
					<span>
						<b>{department}</b> Department
					</span>
				)}
			</p>
			{form ? (
				<button
					type="submit"
					onClick={addEmployee}
					className="btn waves-effect waves-light">
					Submit<i className="material-icons right">send</i>
				</button>
			) : null}
		</div>
	);
};

export default Employee;
