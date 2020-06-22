import React from "react";

/**
 * A loading circle
 */
const Preloader = () => {
	return (
		<div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-red-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div>
					<div className="gap-patch">
						<div className="circle"></div>
					</div>
					<div className="circle-clipper right">
						<div className="circle"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Preloader;
