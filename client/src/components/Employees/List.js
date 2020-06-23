import React from "react";
import Preloader from "../Preloader";

const List = ({ emFilter }) => {
	return (
		<ul
			style={{ border: "unset", borderRadius: "0.25rem" }}
			className={emFilter.length > 0 ? "collection" : ""}>
			{emFilter.length > 0 ? (
				emFilter.map((em) => (
					<li className="collection-item" key={em._id}>
						<div style={{ width: "100%" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "baseline"
								}}>
								<p
									style={{
										marginBottom: "0",
										fontWeight: "bolder",
										fontSize: "1.5rem"
									}}>
									{em.firstName} {em.lastName}
								</p>
								<span style={{ marginBottom: "0", textAlign: "right" }}>
									{em.title}
								</span>
							</div>
							<hr style={{ width: "100%", borderColor: "var(--accent)" }} />
							<p style={{ marginTop: "0" }}>
								<b>{em.department}</b> Department
							</p>
						</div>
					</li>
				))
			) : (
				<Preloader />
			)}
		</ul>
	);
};

export default List;
