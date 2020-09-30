import React from "react";

import OrgReposList from "./../components/OrgReposList.js";
/**
 * Page for displaying organization's repositories
 */
function OrgRepos() {
	// Accessing the context Store

	return (
		<section>
			{" "}
			To display List of All repos
			<OrgReposList />
		</section>
	);
}

export default OrgRepos;
