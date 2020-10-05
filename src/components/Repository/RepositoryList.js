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
import Spinner from "../Spinner/Spinner.js";

/**
 * JSDoc
 * @param {object} history Provides different implementation of managing session history
 * @param {object} location Represents where the app is now
 * @description Display a single repository with info about that repository
 * @returns JSX
 */
function RepositoryList({ history, location }) {
	// current data from the context store
	const { repository_url, updateRepositoryUrl, organization_name } = useContext(AppContext);

	const [error, setError] = useState(false); // Use this state to determine when to render the error page

	const [repoData, setRepoData] = useState({}); // State for holding basic details about a repository

	useEffect(() => {
		(async () => {
			try {
				if (
					!!repository_url === false &&
					!!localStorage.getItem(REPO_URL_STORAGE_KEY) === false
				) {
					// Redirect to the error page if we don't have anything save to the local storage and we are trying to access commits from an empty string or a falsy value
					setError(true);
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
					 * -  If all the above cases do not fall true, we get the path name and try to fetch data for it.
					 * -  If we have an error, that means the repo doesn't exist and we want to render the error page
					 * - If the path name was able to return data we render commits for that repo
					 * */

					setError(false);
					let pathName = location.pathname;
					pathName = pathName.split("/");
					pathName = pathName[pathName.length - 1];
					console.log(repository_url, organization_name);
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
		<section
			className="container"
			style={{
				backgroundColor: "#ecf2fd",
			}}
		>
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
				<>{error ? <Page404 /> : <Spinner />}</>
			)}
		</section>
	);
}

export default withRouter(RepositoryList);
