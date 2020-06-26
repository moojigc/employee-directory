import React from "react";
import { useEffect } from "react";
import { FormSelect } from "materialize-css";

const Select = ({ handleFilter, options, label, defaultOption }) => {
	useEffect(() => {
		FormSelect.init(document.querySelectorAll("select"));
	});
	return (
		<div className="input-field col s12" style={{ margin: "0 auto" }}>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}>
				<label style={{ fontSize: "1rem", marginRight: "0.25rem" }} htmlFor="department">
					Filter by {label}:
				</label>
				<select onChange={handleFilter} htmlFor={`filter-by-${label}`}>
					<option value="*" disabled defaultValue>
						Choose {label}
					</option>
					<option onClick={handleFilter} value={defaultOption} key={defaultOption}>
						{defaultOption}
					</option>
					{options.map((option) => {
						return (
							<option onClick={handleFilter} value={option} key={option}>
								{option}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default Select;
