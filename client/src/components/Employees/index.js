import React, { useEffect, useState, useContext } from "react";
import { getEmployees } from "../../utils/api";
import Container from "../Container";
import "./index.css";
import Header from "../Header";
import Main from "../Main";
import UserContext from "../../utils/UserContext";
import Preloader from "../Preloader";

const Employees = () => {
	const user = useContext(UserContext);
	const [employees, setEmployees] = useState([]);
	const getAllEmployees = () => {
		getEmployees().then(({ data }) => {
			setEmployees(data);
		});
	};
	useEffect(() => {
		if (user.auth) {
			getAllEmployees();
		}
	}, [user]);
	return (
		<Container>
			<Header>Employees</Header>
			<Main padding="1rem 2rem">
				<ul className={employees.length > 0 ? "collection" : ""}>
					{employees.length > 0 ? (
						employees.map((em) => (
							<li
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									color: "black"
								}}
								className="collection-item"
								key={em._id}>
								<div>
									<p>{`${em.title}: ${em.firstName} ${em.lastName}`}</p>
									<p>Department: {em.department}</p>
								</div>
								<button className="btn waves-effect waves-light">
									<i className="material-icons">menu</i>
								</button>
							</li>
						))
					) : (
						<Preloader />
					)}
				</ul>
			</Main>
		</Container>
	);
};

export default Employees;
