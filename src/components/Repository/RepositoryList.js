import React, { useContext, useEffect, useState } from "react";

import { REPO_URL_STORAGE_KEY } from "./../../utils/CONSTANTS.js";

import { fetchSingleRepoData } from "./../../utils/utilityFunctions.js";

import AppContext from "./../../context/AppContext.js";
import RepositoryCard from "./RepositoryCard.js";

// Styles
import "./RepositoryStyles.css";
import RepositoryHeader from "./RepositoryHeader.js";

/**
 * Display a single repository with info about that repository
 */
function RepositoryList() {
	const { repository_url } = useContext(AppContext);
	const [repoData, setRepoData] = useState({});
	useEffect(() => {
		(async () => {
			const repo_endpoint = localStorage.getItem(REPO_URL_STORAGE_KEY); // Use localStorage to enable a user refresh a page

			console.log(repo_endpoint);
			let data = await fetchSingleRepoData(repo_endpoint);

			setRepoData(data);
		})();
	}, [repository_url]);

	return (
		<section className="container">
			{repoData.repo_name ? (
				<>
					<RepositoryHeader repoData={repoData} />

					<section className="commit-section">
						{repoData.commit_data.map((commit_data, i) => {
							return <RepositoryCard key={i} commit_data={commit_data} />;
						})}
					</section>
				</>
			) : (
				<p>Fetching Data</p>
			)}
		</section>
	);
}

export default RepositoryList;
