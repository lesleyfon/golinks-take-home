import React from "react";
import Header from "../components/Header/Header.js";

import OrgReposList from "./../components/OrgRepoList/OrgReposList.js";
/**
 * Page for displaying organization's repositories
 */
function OrgRepos() {
	// Accessing the context Store

	return (
		<section className="row">
			{" "}
			{/* To display List of All repos */}
			<Header />
			<OrgReposList />
		</section>
	);
}

export default OrgRepos;
