import React, { useContext } from "react";
import AppContext from "./../context/AppContext.js";
/**
 * Display a single repository with info about that repository
 */
function Repository() {
	const { repository_url } = useContext(AppContext);
	console.log(repository_url);

	return <section>Single Repo</section>;
}

export default Repository;
