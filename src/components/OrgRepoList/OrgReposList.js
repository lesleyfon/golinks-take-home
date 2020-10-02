import React, { useEffect, useContext, useState } from "react";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";

import OrgRepoCard from "./OrgRepoCard.js";

function OrgReposList() {
	// Get the current Organisation name from the context store
	const { organization_name } = useContext(AppContext);

	const [repo, setRepo] = useState([]);
	const [err, setErr] = useState({
		message: "",
		isErr: false,
	});
	// UseEffect for fetching data when component mounts
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(organization_name);
				setRepo(() => {
					return data;
				});
				setErr({
					message: "",
					isErr: false,
				});
			} catch (err) {
				setErr({
					message: err.message,
					isErr: true,
				});
				console.log(err);
			}
		})();
	}, [organization_name]);

	return (
		<section className="section-container col-lg-7 col-md-12 col-sm-12">
			{repo.length > 0 ? (
				repo.map((repoInfo) => <OrgRepoCard key={repoInfo.id} repoInfo={repoInfo} />)
			) : (
				<>
					{err.isErr ? (
						<h3
							style={{
								textAlign: "left",
							}}
						>
							Error: Double Check the organization name if it is spelled right
						</h3>
					) : (
						<h1>No Repositories in this Organization</h1>
					)}
				</>
			)}
		</section>
	);
}

export default OrgReposList;
