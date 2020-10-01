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
	const { orgName } = useContext(AppContext);

	const [repo, setRepo] = useState([]);

	// UseEffect for fetching data when component mounts
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(orgName);
				setRepo(() => {
					return data;
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [orgName]);

	// Conditionally render component
	if (repo.length > 0) {
		return (
			<>
				{repo.map((repoInfo) => (
					<OrgRepoCard key={repoInfo.id} repoInfo={repoInfo} />
				))}
			</>
		);
	} else {
		return <h1>No Repositories in this Organization</h1>;
	}
}

export default OrgReposList;
