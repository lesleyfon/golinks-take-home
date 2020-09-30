import React, { useEffect, useContext, useState } from "react";
import { Card } from "react-bootstrap";

import AppContext from "./../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "./../utils/utilityFunctions";

function OrgReposList() {
	const { orgName } = useContext(AppContext);
	const [repo, setRepo] = useState([]);
	useEffect(() => {
		(async () => {
			let data = await fetchOrganizationRepos(orgName);
			setRepo(() => {
				return data;
			});
		})();
	}, []);

	if (repo.length === 0) {
		return <h1>No Repositories in this Organization</h1>;
	} else {
		return (
			<>
				{repo.map((repoInfo) => (
					<ul key={repoInfo.id}>
						<Card>
							<li>{repoInfo.id}</li>
							<li>{repoInfo.name}</li>
							<li>{repoInfo.language}</li>
							<li>{repoInfo.star_count}</li>
							<li>{repoInfo.fork_count}</li>
						</Card>
					</ul>
				))}
			</>
		);
	}
}

export default OrgReposList;
