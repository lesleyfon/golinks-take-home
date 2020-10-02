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

	// UseEffect for fetching data when component mounts
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(organization_name);
				setRepo(() => {
					return data;
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [organization_name]);

	return (
		<section className="section-container col-lg-7 col-md-12 col-sm-12">
			{repo.length > 0 ? (
				repo.map((repoInfo) => <OrgRepoCard key={repoInfo.id} repoInfo={repoInfo} />)
			) : (
				<h1>No Repositories in this Organization</h1>
			)}
		</section>
	);
}

export default OrgReposList;
