import React, { useContext, useEffect, useState } from "react";
import { REPO_URL_STORAGE_KEY } from "../utils/CONSTANTS.js";
import AppContext from "./../context/AppContext.js";

import { fetchSingleRepoData, parseDate } from "./../utils/utilityFunctions";

/**
 * Display a single repository with info about that repository
 */
function Repository() {
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
		<section>
			{repoData.repo_name ? (
				<>
					<h3>{repoData.repo_name}</h3>
					<p>{repoData.description}</p>
					<p>{repoData.star_count}</p>
					{repoData.commit_data.map((commit_data, i) => (
						<div key={i}>
							<>{console.log(commit_data)}</>
							{/* <>{console.log(commit_data.commit.message)}</> */}
							<h5>Title: </h5>
							<h5>User Name: {commit_data.commit.author.name}</h5>
							<p>Hash: {commit_data.sha}</p>
							<p>Date {parseDate(commit_data.commit.author.date)}</p>
						</div>
					))}
				</>
			) : null}
		</section>
	);
}

export default Repository;
