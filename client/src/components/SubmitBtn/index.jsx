import React from "react";

/**
 * A center-justified submit button that takes an onClick function
 * @param {Object} props
 * @param {Function} props.handleClick
 */
const SubmitBtn = ({ handleClick }) => {
	return (
		<div className="row" style={{ display: "flex", justifyContent: "center" }}>
			<button onClick={handleClick} className="btn waves-effect waves-light" type="submit">
				Submit <i className="material-icons right">send</i>
			</button>
		</div>
	);
};

export default SubmitBtn;
