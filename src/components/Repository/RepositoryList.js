import React, { useContext, useEffect, useState } from "react";

import { REPO_URL_STORAGE_KEY } from "./../../utils/CONSTANTS.js";

import { fetchSingleRepoData } from "./../../utils/utilityFunctions.js";

import AppContext from "./../../context/AppContext.js";
import RepositoryCard from "./RepositoryCard.js";

// Styles
import "./RepositoryStyles.css";
/**
 * Display a single repository with info about that repository
 */
function RepositoryList() {
	const { repository_url } = useContext(AppContext);
	const [repoData, setRepoData] = useState({});
	useEffect(() => {
		(async () => {
			let data = await fetchSingleRepoData(
				repository_url || localStorage.getItem(REPO_URL_STORAGE_KEY)
			);

			setRepoData(data);
		})();
	}, [repository_url]);

	return (
		<section className="container">
			{repoData.repo_name ? (
				<>
					<RepositoryCard repoData={repoData} />
				</>
			) : (
				<p>console.error();</p>
			)}
		</section>
	);
}

export default RepositoryList;
