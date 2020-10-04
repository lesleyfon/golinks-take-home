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
			<section className="section-container col-lg-7 col-md-12 col-sm-12">
				{/* Displays cards of all repository in an organization   */}
				<OrgReposList />
			</section>
		</section>
	);
}

export default OrganizationRepository;
