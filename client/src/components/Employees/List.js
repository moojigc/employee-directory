import React, { useState, useEffect } from "react";
import Preloader from "../Preloader";
import "./index.css";
import Axios from "axios";
import { Dropdown } from "materialize-css";
import { useHistory } from "react-router-dom";

const List = ({ setFlash, getAllEmployees, emFilter, company }) => {
	const Employee = ({ form, name, title, department }) => {
		const history = useHistory();
		const [newFirstName, setFirstName] = useState("");
		const [newLastName, setLastName] = useState("");
		const [newTitle, setTitle] = useState("");
		const [newDept, setDept] = useState("");
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
			console.log(data);
			setFlash(data.flash);
			if (data.flash.type === "error") {
				history.push(data.redirect);
			}
			getAllEmployees();
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
	useEffect(() => {
		// MaterializeCSS
		Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
			coverTrigger: false
		});
	});
	return (
		<ul
			style={{ border: "unset", borderRadius: "0.25rem" }}
			className={emFilter.length > 0 ? "collection" : ""}>
			{emFilter.length > 0 ? (
				emFilter.map((em, i) => (
					<li className="collection-item" key={em._id}>
						<ul id={"dropdown" + i} className="dropdown-content">
							<li>
								<button
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
							name={em.firstName + " " + em.lastName}
							title={em.title}
							department={em.department}
						/>
					</li>
				))
			) : (
				<Preloader />
			)}
			<li className="collection-item">
				<form>
					<h5 style={{ textAlign: "center" }}>Add new employee</h5>
					<Employee form={true} />
				</form>
			</li>
		</ul>
	);
};

export default List;
