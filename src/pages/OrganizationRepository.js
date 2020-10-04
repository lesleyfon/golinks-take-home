import React from "react";
import Header from "../components/Header/Header.js";

import OrgReposList from "../components/OrgRepoList/OrgReposList.js";

/**
 * Page for displaying organization's repositories
 */
function OrganizationRepository() {
	return (
		<section className="row">
			{" "}
			{/* Displays basic information about an organization repository */}
			<Header />
			{/* Displays cards of all repository in an organization   */}
			<OrgReposList />
		</section>
	);
}

export default OrganizationRepository;
