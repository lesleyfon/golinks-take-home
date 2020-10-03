import React, { useContext, useEffect, useState } from "react";

import { REPO_URL_STORAGE_KEY } from "./../../utils/CONSTANTS.js";

import { fetchSingleRepoData } from "./../../utils/utilityFunctions.js";

import AppContext from "./../../context/AppContext.js";
import RepositoryCard from "./RepositoryCard.js";

// Styles
import "./RepositoryStyles.css";
import RepositoryHeader from "./RepositoryHeader.js";
import { withRouter } from "react-router-dom";
import Page404 from "../../pages/404/404.js";

/**
 * Display a single repository with info about that repository
 */
function RepositoryList({ history, location }) {
	const { repository_url, updateRepositoryUrl, organization_name } = useContext(AppContext);
	const [error, setError] = useState(false); // Use this state to determine when to render the erro page

	const [repoData, setRepoData] = useState({});
	useEffect(() => {
		(async () => {
			try {
				if (
					!!repository_url === false &&
					!!localStorage.getItem(REPO_URL_STORAGE_KEY) === false
				) {
					// Redirect to the error page if we don't have anything save to the local storage and we are trying to access commits from repo
					setError(false);
					history.push("/error");
				}

				if (!!repository_url) {
					// If the repository url is update. This means someone clicked a repo card and is trying to access commits from this repo, then we want to fetch commit data for that repository

					setError(false);
					let data = await fetchSingleRepoData(repository_url);
					setRepoData(data);
					return;
				} else {
					/**
					 * -  If all the above cases do not fall true, we get the path name fand try to fetch data for it.
					 * -  If we have an error, that means the repo doesn't exist and we want to render the error page
					 * - If the path name was able to return data we render commits for that repo
					 
					 * */

					setError(false);
					let pathName = location.pathname;
					pathName = pathName.split("/");
					pathName = pathName[pathName.length - 1];

					let data = await fetchSingleRepoData(`${organization_name}/${pathName}`);
					setRepoData(data);
				}
			} catch (error) {
				setError(true);
				history.push(location.pathname);
			}
		})();
	}, [repository_url, updateRepositoryUrl, history, location.pathname, organization_name]);

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
				<>{error ? <Page404 /> : <h2>Loading...</h2>}</>
			)}
		</section>
	);
}

export default withRouter(RepositoryList);
