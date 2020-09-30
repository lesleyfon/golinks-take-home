import React, { useContext } from "react";
import AppContext from "./../context/AppContext.js";
/**
 * Page for displaying organization's repositories
 */
function OrgRepos() {
	// Accessing the context Store
	const { orgName } = useContext(AppContext);

	return <section> To display List of All repos</section>;
}

export default OrgRepos;
