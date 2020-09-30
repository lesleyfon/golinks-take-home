import React, { useEffect, useContext, useState } from "react";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";
import OrgRepoCard from "./OrgRepoCard.js";

function OrgReposList() {
	const { orgName } = useContext(AppContext);
	const [repo, setRepo] = useState([]);

	// UseEffect for fetching data
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(orgName);
				setRepo(() => {
					return data;
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [orgName]);

	if (repo.length === 0) {
		return <h1>No Repositories in this Organization</h1>;
	} else {
		return (
			<>
				{repo.map((repoInfo) => (
					<OrgRepoCard repoInfo={repoInfo} />
				))}
			</>
		);
	}
}

export default OrgReposList;
