import React from "react";

const Select = ({ handleFilter, options, label, defaultOption }) => {
	return (
		<div className="input-field col s6" style={{ margin: "0 auto" }}>
			<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
				<label style={{ fontSize: "1rem" }} htmlFor="department">
					Filter by {label}
				</label>
			</div>
			<select htmlFor={`filter-by-${label}`} className="browser-default">
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
	);
};

export default Select;
